import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/authentication/signIn/signIn";
import SignUp from "./components/authentication/signUp/signUp";
import Home from "./components/home/Home";
import DoctorForm from "./components/home/doctor/Form";
import PatientForm from "./components/home/patient/Patients_Form";
import ECG from "./components/home/doctor/demo/index"
import LoginPage from "./components/authentication/signIn/signIn";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/doctor" element={<DoctorForm />} />
        <Route path="/patients" element={<PatientForm />} />
        <Route path="/ECG" element={<ECG />} />
        <Route path="/loginPage" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
