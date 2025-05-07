import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        first_name: '',
        last_name: '',
        email: '',
        date_of_birth: '',
        marks: [{ subject: '', score: '', exam_date: '' }]
    });

    useEffect(() => {
        if (id) {
            axios.get(`/api/students/${id}`)
                .then(response => setStudent(response.data))
                .catch(error => console.error(error));
        }
    }, [id]);

    const handleChange = (e, index) => {
        if (index !== undefined) {
            const newMarks = [...student.marks];
            newMarks[index][e.target.name] = e.target.value;
            setStudent({ ...student, marks: newMarks });
        } else {
            setStudent({ ...student, [e.target.name]: e.target.value });
        }
    };

    const addMark = () => {
        setStudent({
            ...student,
            marks: [...student.marks, { subject: '', score: '', exam_date: '' }]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = id ? 'put' : 'post';
        const url = id 
            ? `/api/students/${id}`
            : `/api/students`;

        axios[method](url, student)
            .then(() => navigate('/'))
            .catch(error => console.error(error));
    };

    return (
        <div className="card">
            <div className="card-body">
                <h2>{id ? 'Edit' : 'Create'} Student</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="first_name"
                            value={student.first_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="last_name"
                            value={student.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={student.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Date of Birth</label>
                        <input
                            type="date"
                            className="form-control"
                            name="date_of_birth"
                            value={student.date_of_birth}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <h4>Marks</h4>
                    {student.marks.map((mark, index) => (
                        <div key={index} className="row mb-3">
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="subject"
                                    placeholder="Subject"
                                    value={mark.subject}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="number"
                                    className="form-control"
                                    name="score"
                                    placeholder="Score"
                                    value={mark.score}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="date"
                                    className="form-control"
                                    name="exam_date"
                                    value={mark.exam_date}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-secondary mb-3"
                        onClick={addMark}
                    >
                        Add Mark
                    </button>
                    
                    <div>
                        <button type="submit" className="btn btn-primary me-2">
                            {id ? 'Update' : 'Create'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;