import React from 'react';
import Exercise from './Exercise';

function ExerciseList({ exercises, onDelete, onEdit }){
    return(
        <table id="exercises">
            <thead>
                <tr>
                    <th className='headElement'>Name</th>
                    <th className='headElement'>Reps</th>
                    <th className='headElement'>Weight</th>
                    <th className='headElement'>Unit</th>
                    <th className='headElement'>Date</th>
                    <th className='headElement'></th>
                    <th className='headElement'></th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, index) => <Exercise onDelete={onDelete} onEdit={onEdit} key={index} exercise={exercise} />)}
            </tbody>
        </table>
    )
};

export default ExerciseList;