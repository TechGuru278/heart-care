import React, { useState } from 'react';
import './form.scss';
import { Link, useNavigate } from 'react-router-dom';

const HealthForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: '',
    cp: '',
    bp: '',
    cholesterol: '',
    sugar: '',
    ecg: '',
    heartRate: '',
    doctorVerdict: '',
  });

  const [showECGImage, setShowECGImage] = useState(false);
  const [risk, setRisk] = useState(null);
  const [summary, setSummary] = useState('');
  const [showVerdict, setShowVerdict] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const GOOGLE_FORM_URL = 'https://script.google.com/macros/s/AKfycbwDTxFDj6Cdace2enpkjNuAEZYaFTDKFKcuX_3CEFyRG5eSE_kAqJIl2nBQdBQW30M0eQ/exec';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitToGoogleForm = async (data) => {
    try {
      const formData = {
        Name: data.name,
        Age: data.age,
        Sex: data.sex,
        CP: data.cp,
        BP: data.bp,
        Cholesterol: data.cholesterol,
        Sugar: data.sugar,
        "Heart Rate": data.heartRate,
        DoctorVerdict: data.doctorVerdict || '',
        Risk: risk || '',
        "Risk Status": risk || '',
        Timestamp: new Date().toISOString()
      };

      console.log('Attempting to submit data:', formData);

      const response = await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      console.log('Form submitted successfully', formData);
      return true;
    } catch (error) {
      console.error('Error submitting form:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    
    checkHeartRisk();
    generateSummary();
    setShowVerdict(true);
  };

  const checkHeartRisk = () => {
    let riskStatus = 'Low Risk';

    if (formData.cp === 'yes') {
      riskStatus = 'High Risk (Chest pain detected)';
    }
    if (formData.bp > 140) {
      riskStatus = 'High Risk (High Blood Pressure)';
    }
    if (formData.cholesterol > 200) {
      riskStatus = 'High Risk (High Cholesterol)';
    }
    if (formData.sugar > 100) {
      riskStatus = 'High Risk (High Blood Sugar)';
    }
    if (formData.heartRate < 60 || formData.heartRate > 100) {
      riskStatus = 'High Risk (Abnormal Heart Rate)';
    }

    setRisk(riskStatus);
  };

  const generateSummary = () => {
    let healthSummary = '';

    if (formData.cp === 'yes') {
      healthSummary += 'You may be experiencing chest pain, which could indicate a heart problem. It is strongly recommended to consult a healthcare provider immediately.\n';
    }

    if (formData.bp > 140) {
      healthSummary += 'High blood pressure detected. You should monitor your blood pressure regularly and consult a doctor. Lifestyle changes like a balanced diet, exercise, and medication may help manage it.\n';
    }

    if (formData.cholesterol > 200) {
      healthSummary += 'High cholesterol levels detected. It is advisable to reduce dietary fats, exercise regularly, and consult your healthcare provider for advice on managing cholesterol.\n';
    }

    if (formData.sugar > 100) {
      healthSummary += 'High blood sugar levels detected. A healthy diet, regular exercise, and weight management can help. If symptoms persist, please consult a doctor.\n';
    }

    if (formData.heartRate < 60 || formData.heartRate > 100) {
      healthSummary += 'Abnormal heart rate detected. If your heart rate is consistently too low or too high, consult a healthcare provider to assess the cause and explore treatment options.\n';
    }

    if (!healthSummary) {
      healthSummary = 'Your health data seems normal. However, maintaining a balanced diet, regular physical activity, and routine health checkups are recommended for overall well-being.\n';
    }

    setSummary(healthSummary);
  };

  const handleVerdictSubmit = async () => {
    if (formData.doctorVerdict && !isSubmitted) {
      const submitted = await submitToGoogleForm({
        ...formData,
        DoctorVerdict: formData.doctorVerdict,
        Risk: risk || '',
        "Risk Status": risk || ''
      });
      if (submitted) {
        alert('Form submitted successfully with doctor\'s verdict!');
        setIsSubmitted(true);
      } else {
        alert('Error submitting form. Please try again.');
      }
    } else if (isSubmitted) {
      alert('Form has already been submitted.');
    } else {
      alert('Please select a verdict before submitting.');
    }
  };

  const handleViewData = () => {
    window.location.href = 'src/components/home/doctor/data.html';
  };

  return (
    <div className="health-form-container">
      <form className="health-form" onSubmit={handleSubmit}>
        <h1>Patient Information</h1>

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
          <select name="sex" className="sex" value={formData.sex} onChange={handleChange} required>
            <option value="" disabled>
              Select your sex
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Chest Pain Type (CP):
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

        <label>
          Cholesterol:
          <input
            type="number"
            name="cholesterol"
            value={formData.cholesterol}
            onChange={handleChange}
            required
            placeholder="Enter cholesterol level"
          />
        </label>

        <label>
          Sugar:
          <input
            type="number"
            name="sugar"
            value={formData.sugar}
            onChange={handleChange}
            required
            placeholder="Enter sugar level"
          />
        </label>

        <label>
          ECG (Upload Image): <br />
           <Link to="/ECG"><input  value="ECG Scan" className='jump'/></Link>
        </label>

        <label>
          Heart Rate:
          <input
            type="number"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleChange}
            required
            placeholder="Enter heart rate"
          />
        </label>

        <button type="submit">Submit</button>
        
        <div className="view-data-section">
          <p className="or-text"><center>OR</center></p>
          <button 
            type="button" 
            className="view-data-btn"
            onClick={handleViewData}
          >
            View Patients Details
          </button>
        </div>
      </form>

      {showVerdict && !isSubmitted && (
        <div className="doctor-verdict">
          <label>
            Doctor's Verdict - Does the patient have heart problems?
            <select
              name="doctorVerdict"
              value={formData.doctorVerdict}
              onChange={handleChange}
              required
              className="verdict-select"
            >
              <option value="">Select your verdict</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          {formData.doctorVerdict && (
            <>
              <div className="verdict-summary">
                <h3>Final Verdict</h3>
                <p>
                  Based on the doctor's assessment, the patient 
                  {formData.doctorVerdict === 'yes' 
                    ? ' has been diagnosed with heart problems and requires medical attention.' 
                    : ' does not show significant signs of heart problems at this time.'}
                </p>
              </div>
              <button 
                onClick={handleVerdictSubmit}
                className="submit-verdict-btn"
                disabled={isSubmitted}
              >
                Submit Final Verdict
              </button>
            </>
          )}
        </div>
      )}

      {isSubmitted && (
        <div className="submission-complete">
          <h3>Form Submission Complete</h3>
          <p>The patient's information and doctor's verdict have been recorded.</p>
        </div>
      )}

      {showECGImage && formData.ecg && (
        <div className="ecg-image-container">
          <h2>ECG Estimation</h2>
          <img src={formData.ecg} alt="ECG Result" className="ecg-image" />
        </div>
      )}

      {showECGImage && (
        <div className="table-container">
          <center><h2>Final Report</h2></center>
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
                    <td>{key === 'doctorVerdict' ? "Doctor's Verdict" : key}</td>
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
          <h3>Health Summary and Recommendations:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default HealthForm;
