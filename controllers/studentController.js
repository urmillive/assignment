const pool = require('../utils/db');

exports.createStudent = async (req, res) => {
    const { first_name, last_name, email, date_of_birth, marks } = req.body;
    try {
        const client = await pool.connect();
        await client.query('BEGIN');

        const studentResult = await client.query(
            'INSERT INTO students (first_name, last_name, email, date_of_birth) VALUES ($1, $2, $3, $4) RETURNING *',
            [first_name, last_name, email, date_of_birth]
        );

        const studentId = studentResult.rows[0].student_id;

        if (marks && marks.length > 0) {
            for (const mark of marks) {
                await client.query(
                    'INSERT INTO marks (student_id, subject, score, exam_date) VALUES ($1, $2, $3, $4)',
                    [studentId, mark.subject, mark.score, mark.exam_date]
                );
            }
        }

        await client.query('COMMIT');
        client.release();
        res.status(201).json(studentResult.rows[0]);
    } catch (error) {
        await client.query('ROLLBACK');
        client.release();
        res.status(500).json({ error: error.message });
    }
};

exports.getAllStudents = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const client = await pool.connect();
        
        const totalResult = await client.query('SELECT COUNT(*) FROM students');
        const total = parseInt(totalResult.rows[0].count);

        const studentsResult = await client.query(
            'SELECT * FROM students ORDER BY student_id LIMIT $1 OFFSET $2',
            [limit, offset]
        );

        client.release();
        res.json({
            students: studentsResult.rows,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await pool.connect();
        
        const studentResult = await client.query(
            'SELECT * FROM students WHERE student_id = $1',
            [id]
        );

        if (studentResult.rows.length === 0) {
            client.release();
            return res.status(404).json({ error: 'Student not found' });
        }

        const marksResult = await client.query(
            'SELECT * FROM marks WHERE student_id = $1',
            [id]
        );

        client.release();
        res.json({
            ...studentResult.rows[0],
            marks: marksResult.rows
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateStudent = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, date_of_birth, marks } = req.body;
    try {
        const client = await pool.connect();
        await client.query('BEGIN');

        const studentResult = await client.query(
            'UPDATE students SET first_name = $1, last_name = $2, email = $3, date_of_birth = $4 WHERE student_id = $5 RETURNING *',
            [first_name, last_name, email, date_of_birth, id]
        );

        if (studentResult.rows.length === 0) {
            client.release();
            return res.status(404).json({ error: 'Student not found' });
        }

        if (marks && marks.length > 0) {
            await client.query('DELETE FROM marks WHERE student_id = $1', [id]);
            for (const mark of marks) {
                await client.query(
                    'INSERT INTO marks (student_id, subject, score, exam_date) VALUES ($1, $2, $3, $4)',
                    [id, mark.subject, mark.score, mark.exam_date]
                );
            }
        }

        await client.query('COMMIT');
        client.release();
        res.json(studentResult.rows[0]);
    } catch (error) {
        await client.query('ROLLBACK');
        client.release();
        res.status(500).json({ error: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await pool.connect();
        const result = await client.query(
            'DELETE FROM students WHERE student_id = $1 RETURNING *',
            [id]
        );

        client.release();
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};