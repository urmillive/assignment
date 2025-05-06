-- Creating students table
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    date_of_birth DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating marks table with foreign key to students
CREATE TABLE marks (
    mark_id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL,
    subject VARCHAR(50) NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    exam_date DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);

-- Creating indexes for better query performance
CREATE INDEX idx_student_email ON students(email);
CREATE INDEX idx_marks_student_id ON marks(student_id);