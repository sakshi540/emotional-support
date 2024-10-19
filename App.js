import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    sleepQuality: '',
    headaches: '',
    academicPerformance: '',
    studyLoad: '',
    extracurricular: '',
    stressLevels: '',
  });

  const [suggestion, setSuggestion] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stressScore = calculateStressScore(formData);
    const suggestions = getSuggestions(stressScore, formData);
    setSuggestion(suggestions);
  };

  const calculateStressScore = (data) => {
    // Calculate stress score (this is just an example, customize as needed)
    const sleepImpact = 5 - parseInt(data.sleepQuality); // poor sleep increases stress
    const headacheImpact = parseInt(data.headaches) > 3 ? 2 : 0; // frequent headaches add stress
    const stressLevelImpact = parseInt(data.stressLevels); // self-rated stress level
    const studyLoadImpact = parseInt(data.studyLoad) > 3 ? 2 : 0; // heavy study load adds stress

    return sleepImpact + headacheImpact + stressLevelImpact + studyLoadImpact;
  };

  const getSuggestions = (stressScore, data) => {
    let suggestions = '';

    if (stressScore > 8) {
      suggestions += 'Your stress levels seem high. We recommend you consult a mentor or counselor for support.\n';
    } else if (stressScore > 5) {
      suggestions += 'You might be experiencing moderate stress. Try managing your time better and ensure you get enough sleep. Consider joining relaxation activities.\n';
    } else {
      suggestions += 'You seem to be handling things well! Keep it up, but don’t hesitate to reach out to a mentor if things get tough.\n';
    }

    if (parseInt(data.sleepQuality) < 3) {
      suggestions += 'Improving your sleep quality can have a big impact on reducing stress. Try creating a consistent bedtime routine.\n';
    }

    if (parseInt(data.academicPerformance) < 3) {
      suggestions += 'If you are struggling academically, seeking help from a tutor or mentor might improve your confidence and reduce stress.\n';
    }

    if (parseInt(data.extracurricular) < 2) {
      suggestions += 'Engaging in more extracurricular activities can help relieve stress and provide balance to your daily routine.\n';
    }

    return suggestions;
  };

  return (
    <div className="App">
      <h1>Student Emotion Support</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Sleep Quality:
          <input
            type="number"
            name="sleepQuality"
            value={formData.sleepQuality}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </label>

        <label>
          Headaches Frequency:
          <input
            type="number"
            name="headaches"
            value={formData.headaches}
            onChange={handleChange}
            min="1"
            max="7"
            required
          />
        </label>

        <label>
          Academic Performance:
          <input
            type="number"
            name="academicPerformance"
            value={formData.academicPerformance}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </label>

        <label>
          Study Load:
          <input
            type="number"
            name="studyLoad"
            value={formData.studyLoad}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </label>

        <label>
          Extracurricular Activities (per week):
          <input
            type="number"
            name="extracurricular"
            value={formData.extracurricular}
            onChange={handleChange}
            min="0"
            max="7"
            required
          />
        </label>

        <label>
          Stress Levels:
          <input
            type="number"
            name="stressLevels"
            value={formData.stressLevels}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>

      {suggestion && (
        <div className="suggestion">
          <h2>Our Suggestions</h2>
          <p>{suggestion}</p>
        </div>
      )}
    </div>
  );
}

export default App;
