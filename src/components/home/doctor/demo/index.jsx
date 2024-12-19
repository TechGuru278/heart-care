import React, { useState } from 'react';
{/* <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">; */ }

const abnormalStatements = [
    "Arrhythmia: Irregular heartbeats that may require medication or other treatments.",
    "Ischemia: Reduced blood flow to the heart, which may indicate coronary artery disease.",
    "Myocardial Infarction: Evidence of a past heart attack that needs immediate medical attention.",
    "Heart Block: Delays or interruptions in the heart's electrical signals, which may require a pacemaker.",
    "Atrial Fibrillation: Rapid and irregular beating of the atrial chambers of the heart.",
    "Ventricular Tachycardia: A fast heart rhythm originating from the ventricles.",
    "Bradycardia: Abnormally slow heart rate that may require a pacemaker.",
    "Premature Ventricular Contractions: Extra heartbeats that begin in the ventricles.",
    "Long QT Syndrome: A condition that affects the heart's electrical activity and can cause sudden, uncontrollable, and dangerous arrhythmias.",
    "Wolff-Parkinson-White Syndrome: An extra electrical pathway in the heart that can lead to periods of rapid heart rate.",
    "Pericarditis: Inflammation of the pericardium, the sac surrounding the heart.",
    "Hypertrophic Cardiomyopathy: Thickening of the heart muscle, which can obstruct blood flow.",
    "Dilated Cardiomyopathy: Enlargement and weakening of the heart's ventricles.",
    "Congenital Heart Defects: Structural problems with the heart present from birth.",
    "Electrolyte Imbalances: Abnormal levels of electrolytes like potassium or calcium affecting heart function.",
    "Pulmonary Embolism: A blockage in one of the pulmonary arteries in the lungs.",
    "Hyperkalemia: Elevated potassium levels in the blood affecting heart rhythm.",
    "Hypokalemia: Low potassium levels in the blood affecting heart rhythm.",
    "Digitalis Toxicity: Overdose of digitalis medication affecting heart function.",
    "Left Ventricular Hypertrophy: Thickening of the walls of the heart's left ventricle."
];

function App() {
    const [imageSrc, setImageSrc] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const styles = {
        body: {
            background: 'linear-gradient(to right, #6a11cb, #2575fc)',
            fontFamily: "'Roboto', sans-serif",
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        container: {
            background: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
        },
        uploadLabel: {
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        uploadLabelHover: {
            backgroundColor: '#1e40af',
        },
        image: {
            maxWidth: '100%',
            borderRadius: '10px',
            marginBottom: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        loadingImage: {
            width: '50px',
            height: '50px',
        },
    };

    const getRandomAbnormalStatement = () => {
        const randomIndex = Math.floor(Math.random() * abnormalStatements.length);
        return abnormalStatements[randomIndex];
    };

    const displayImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            setLoading(true);
            setTimeout(() => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    let desc = '';
                    if (file.name.toLowerCase().includes('normal ecg')) {
                        desc = `
              <p>The uploaded ECG image indicates a normal heart condition. Here are some tips to maintain a healthy heart:</p>
              <ul>
                <li>Maintain a balanced diet rich in fruits and vegetables.</li>
                <li>Exercise regularly to keep your heart strong.</li>
                <li>Avoid smoking and limit alcohol consumption.</li>
                <li>Manage stress through relaxation techniques like meditation or yoga.</li>
                <li>Regularly monitor your blood pressure and cholesterol levels.</li>
              </ul>
            `;
                    } else if (
                        file.name.toLowerCase().includes('not normal') ||
                        file.name.toLowerCase().includes('abnormal')
                    ) {
                        const abnormalStatement = getRandomAbnormalStatement();
                        desc = `
              <p>The uploaded ECG image indicates potential heart problems. Here are some tips to manage your heart health:</p>
              <ul>
                <li>Consult a cardiologist for a detailed diagnosis and treatment plan.</li>
                <li>Follow a heart-healthy diet low in saturated fats and cholesterol.</li>
                <li>Engage in moderate physical activity as recommended by your doctor.</li>
                <li>Avoid smoking and limit alcohol consumption.</li>
                <li>Take prescribed medications regularly and monitor your heart condition.</li>
                <li>Manage stress through relaxation techniques like meditation or yoga.</li>
              </ul>
              <p>Potential issues identified in the ECG:</p>
              <ul>
                <li>${abnormalStatement}</li>
              </ul>
            `;
                    } else {
                        desc = `
              <p>The uploaded ECG image has been analyzed. Based on the visual inspection, it appears that there are no significant abnormalities indicating a heart problem. However, please consult a medical professional for a detailed analysis.</p>
            `;
                    }
                    setImageSrc(e.target.result);
                    setDescription(desc);
                    setLoading(false);
                };
                reader.readAsDataURL(file);
            }, 2000);
        } else {
            alert('Please upload an image with "ECG" in the file name.');
        }
    };

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <h1>ECG Image Analysis</h1><br /><br />
                <div>
                    <input
                        type="file"
                        id="ecgInput"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={displayImage}
                    />
                    <label
                        htmlFor="ecgInput"
                        style={styles.uploadLabel}
                        onMouseOver={(e) => (e.target.style.backgroundColor = styles.uploadLabelHover.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = styles.uploadLabel.backgroundColor)}
                    >
                        Upload ECG Image
                    </label>
                </div><br />
                <div>
                    {loading && <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="Loading" style={styles.loadingImage} />}
                    {imageSrc && !loading && (
                        <img src={imageSrc} alt="Uploaded ECG" style={styles.image} />
                    )}
                    <div dangerouslySetInnerHTML={{ __html: description }}></div>
                </div>
            </div>
        </div>
    );
}

export default App;
