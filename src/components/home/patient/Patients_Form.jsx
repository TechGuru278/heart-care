import React, { useState } from 'react';
import './patients_form.scss';

const HealthForm = () => {
    const [formData, setFormData] = useState({
        name: '', 
        age: '', 
        sex: '', 
        cp: '',  
        bp: '',  
        ecg: '', 
    });         

    const [showECGImage, setShowECGImage] = useState(false);
    const [risk, setRisk] = useState(null);
    const [summary, setSummary] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        alert('Form Submitted Successfully!');
        setShowECGImage(!!formData.ecg); // Show image if uploaded
        checkHeartRisk(); // Assess risk level
        generateSummary(); // Create a health summary
    };

    const checkHeartRisk = () => {
        let riskStatus = 'Low Risk'; // Default risk
        if (formData.cp === 'yes') {
            riskStatus = 'High Risk (Chest Pain Detected)';
        }
        if (formData.bp > 140) {
            riskStatus = 'High Risk (Elevated Blood Pressure)';
        }
        setRisk(riskStatus); // Update risk status
    };

    const generateSummary = () => {
        let healthSummary = '';

        if (formData.cp === 'yes') {
            healthSummary +=
                'Chest pain detected: Immediate medical consultation recommended.\n';
        }
        if (formData.bp > 140) {
            healthSummary +=
                'Elevated blood pressure: Monitor regularly and consult a doctor.\n';
        }
        if (!healthSummary) {
            healthSummary = 'Your health appears normal. Continue regular check-ups.';
        }

        setSummary(healthSummary); // Update summary
    };

    return (
        <div className="health-form-container">
            <form className="health-form" onSubmit={handleSubmit}>
                <h1>Patient Information Form</h1>

                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                    />
                </label>

                <label>
                    Age:
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        placeholder="Enter your age"
                    />
                </label>

                <label>
                    Sex:
                    <select
                        name="sex"
                        className="sex"
                        value={formData.sex}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Select your sex
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </label>

                <label>
                    Chest Pain (CP):
                    <select
                        name="cp"
                        value={formData.cp}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Select Yes or No
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </label>

                <label>
                    Blood Pressure (BP):
                    <input
                        type="number"
                        name="bp"
                        value={formData.bp}
                        onChange={handleChange}
                        required
                        placeholder="Enter BP"
                    />
                </label>

                <button type="submit">Submit</button>
            </form>

            {showECGImage && formData.ecg && (
                <div className="ecg-image-container">
                    <h2>Uploaded ECG</h2>
                    <img src={formData.ecg} alt="ECG Result" className="ecg-image" />
                </div>
            )}

            {showECGImage && (
                <div className="table-container">
                    <center>
                        <h2>Health Report</h2>
                    </center>
                    <table>
                        <thead>
                            <tr>
                                <th>Field</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(formData)
                                .filter(([key]) => key !== 'ecg')
                                .map(([key, value]) => (
                                    <tr key={key}>
                                        <td>{key}</td>
                                        <td>{value}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}

            {risk && (
                <div className="risk-status">
                    <h3>Heart Risk Status: {risk}</h3>
                </div>
            )}

            {summary && (
                <div className="health-summary">
                    <h3>Health Summary & Recommendations:</h3>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
};

export default HealthForm;