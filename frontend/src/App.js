import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import facilities from './components/facilities';
import Home from './components/Home';
import Header from './components/Header';
import OptionPage from './components/OptionsPage';  // Ensure path and naming are correct
 // Import MyHistory component

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/options" element={<OptionPage />} />
        <Route path="/facilities" element={<facilities />} />
        

        {/* <Route path="/student-login" element={
          <Modal>
            <StudentLogin />
          </Modal>
        } />
        <Route path="/student-signup" element={
          <Modal>
            <StudentSignup />
          </Modal>
        } /> */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
