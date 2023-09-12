import mongoose from "mongoose";
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

function isNumValid(num) {
    return num > 0;
}

const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, min: 1, required: true, validate: { validator: isNumValid } },
    weight: { type: Number, min: 1, required: true, validate: { validator: isNumValid } },
    unit: { type: String, required: true },
    date: {
        type: String, required: true, validate: {
            validator: isDateValid
        }
    }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    return exercise.save()
};

const findExercise = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
};

const findExerciseById = async (id) => {
    const query = Exercise.findById(id);
    return query.exec();
}

const replaceExercise = async (filter, replace) => {
    const result = await Exercise.updateOne(filter, replace);
    return {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
    };
};

const deleteExerciseById = async (id) => {
    const result = await Exercise.deleteOne({ _id: id });
    return result.deletedCount;
};

export { isNumValid, isDateValid, createExercise, findExercise, findExerciseById, replaceExercise, deleteExerciseById };

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});