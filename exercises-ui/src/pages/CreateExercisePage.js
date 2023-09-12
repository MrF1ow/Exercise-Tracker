import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddExercisePage() {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 201) {
            alert('Exercise added successfully!');
        } else {
            alert(`Failed to add exercise with status ${response.status}`);
            console.log(`${response} \n ${response.status}`)
        }
        navigate('/');
    };

    return (
        <div>
            <div className="pageHeader">
                <h1 className="pageTitle">Add Exercise</h1>
                <div className="lineBreak"></div>
            </div>
            <div className="dataEntryForm">
                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <input type="number" placeholder="Reps" value={reps} onChange={e => setReps(e.target.value)} />
                <input type="number" placeholder="Weight" value={weight} onChange={e => setWeight(e.target.value)} />
                <select value={unit} onChange={e => setUnit(e.target.value)}>
                    <option value="" disabled>Unit</option>
                    <option value="Kgs">Kgs</option>
                    <option value="Lbs">Lbs</option>
                </select>
                <input type="text" placeholder="Date (mm-dd-yy)" value={date} onChange={e => setDate(e.target.value)} />
                <button onClick={addExercise}>Add</button>
            </div>
        </div>
    )
};

export default AddExercisePage;