import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditExercisePage({ exerciseToEdit }) {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const editExercise = async () => {
        const editedExercise = { name, reps, weight, unit, date };
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            alert('Exercise edited successfully!');
        } else {
            alert(`Failed to edit exercise with status ${response.status}`);
            console.log(`${response} \n ${response.status}`);
        }
        navigate('/');
    };

    const determineOtherUnit = (unit) => {
        if (unit === 'Kgs') {
            return 'Lbs';
        } else {
            return 'Kgs';
        }
    }

    return (
        <div>
            <div className="pageHeader">
                <h1 className="pageTitle">Edit Exercise</h1>
                <div className="lineBreak"></div>
            </div>
            <div className="dataEntryForm">
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                <input type="number" value={reps} onChange={e => setReps(e.target.value)} />
                <input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
                <select value={unit} onChange={e => setUnit(e.target.value)}>
                    <option value={unit}>{unit}</option>
                    <option value={determineOtherUnit(unit)}>{determineOtherUnit(unit)}</option>
                </select>
                <input type="text" value={date} onChange={e => setDate(e.target.value)} />
                <button onClick={editExercise}>Save</button>
            </div>
        </div>
    )
};

export default EditExercisePage;