import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage'; // נתיב לעמוד הבית שלך
import DetailPage from './components/DetailPage'; // נתיב לעמוד הפרטים שלך

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* מסלול לעמוד הבית */}
          <Route path="/" element={<HomePage />} />
          {/* מסלול לעמוד הפרטים */}
          <Route path="/details" element={<DetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
