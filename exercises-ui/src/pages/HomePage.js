import '../App.css';
import React, { useState, useEffect } from 'react';
import ExerciseList from '../components/ExerciseList';
import { useNavigate } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);

    const navigate = useNavigate();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setExercises(exercises.filter(e => e._id !== _id));
        } else {
            console.log(`Failed to Delete Exercise with _id: ${_id}.\nStatus Code: ${response.status}`);
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        navigate('/edit-exercise');
    }

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    };

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <div className="pageContent">
                <div className="pageHeader">
                    <h1 className="pageTitle">Exercise List</h1>
                    <div className="lineBreak"></div>
                </div>
                <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit} />
            </div >
        </>
    )
};

export default HomePage;
