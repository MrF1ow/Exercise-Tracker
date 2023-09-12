import express from "express";
import 'dotenv/config';
import * as exercises from './exercise_model.mjs';

const PORT = process.env.PORT
const app = express();

app.use(express.json());

//CREATE
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ Error: 'Invalid Request' });
        });
});

function all_filters(req) {
    const filter = {};
    if (req.query.name != undefined) {
        filter.name = req.query.name;
    }
    if (req.query.reps != undefined) {
        filter.reps = req.query.reps;
    }
    if (req.query.weight != undefined) {
        filter.weight = req.query.weight;
    }
    if (req.query.unit != undefined) {
        filter.unit = req.query.unit;
    }
    if (req.query.date != undefined) {
        filter.date = req.query.date;
    }
    return filter;
}

//READ
app.get('/exercises', (req, res) => {
    let filter = all_filters(req);
    exercises.findExercise(filter, '', 0)
        .then(exercise => {
            res.status(200).send(exercise);
        })
        .catch(err => {
            console.log(err);
            res.send({ Error: 'Invalid Request' });
        });
})

app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => {
            if (exercise !== null) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(err => {
            res.status(400).json({ Error: 'Invalid Request' });
        });
});

//UPDATE
app.put('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    if (req.body.name && req.body.reps && req.body.weight && req.body.unit && req.body.date) {
        if (exercises.isDateValid(req.body.date) && exercises.isNumValid(req.body.reps) && exercises.isNumValid(req.body.weight)) {
            const filter = { _id: exerciseId };
            const replace = {
                name: req.body.name,
                reps: req.body.reps,
                weight: req.body.weight,
                unit: req.body.unit,
                date: req.body.date,
            };

            exercises.replaceExercise(filter, replace)
                .then(result => {
                    if (result.matchedCount === 1) {
                        exercises.findExerciseById(exerciseId)
                            .then(exercise => {
                                res.status(200).json(exercise);
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(400).json({ Error: 'Invalid Request' });
                            });
                    } else {
                        res.status(404).json({ Error: 'Resource not found' });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json({ Error: 'Invalid Request' });
                });
        } else {
            res.status(400).json({ Error: 'Invalid Request' });
        }
    } else {
        res.status(400).json({ Error: 'Invalid Request' });
    }
});

//DELETE
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteExerciseById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ Error: 'Invalid Request' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
