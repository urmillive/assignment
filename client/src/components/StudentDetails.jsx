import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/students/${id}`)
            .then(response => setStudent(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!student) return <div>Loading...</div>;

    return (
        <div className="card">
            <div className="card-body">
                <h2>Student Details</h2>
                <p><strong>ID:</strong> {student.student_id}</p>
                <p><strong>First Name:</strong> {student.first_name}</p>
                <p><strong>Last Name:</strong> {student.last_name}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Date of Birth:</strong> {student.date_of_birth}</p>
                
                <h4>Marks</h4>
                {student.marks && student.marks.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Score</th>
                                <th>Exam Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student.marks.map(mark => (
                                <tr key={mark.mark_id}>
                                    <td>{mark.subject}</td>
                                    <td>{mark.score}</td>
                                    <td>{mark.exam_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No marks recorded</p>
                )}
                
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate('/')}
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default StudentDetails;