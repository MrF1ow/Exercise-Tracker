import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navigation />
          <div className='App-content'>
            <Routes>
              <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />} />
              <Route path="/create-exercise" element={<CreateExercisePage
              />} />
              <Route path="/edit-exercise" element={< EditExercisePage exerciseToEdit={exerciseToEdit} />} />
            </Routes>
          </div>
          <Footer />
        </header>
      </Router>
    </div>
  );
}

export default App;
