import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });

    useEffect(() => {
        fetchStudents();
    }, [pagination.page]);

    const fetchStudents = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/students?page=${pagination.page}&limit=${pagination.limit}`
            );
            setStudents(response.data.students);
            setPagination({
                ...pagination,
                total: response.data.total,
                totalPages: response.data.totalPages
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/api/students/${id}`);
                fetchStudents();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handlePageChange = (newPage) => {
        setPagination({ ...pagination, page: newPage });
    };

    return (
        <div>
            <Link to="/create" className="btn btn-primary mb-3">
                Add New Student
            </Link>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.student_id}>
                                <td>{student.student_id}</td>
                                <td>{student.first_name}</td>
                                <td>{student.last_name}</td>
                                <td>{student.email}</td>
                                <td>
                                    <Link
                                        to={`/details/${student.student_id}`}
                                        className="btn btn-info btn-sm me-1"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        to={`/edit/${student.student_id}`}
                                        className="btn btn-warning btn-sm me-1"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(student.student_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <nav>
                <ul className="pagination">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                        <li
                            key={page}
                            className={`page-item ${pagination.page === page ? 'active' : ''}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default StudentList;