import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.scss";
import Open from "./image/robot-chat-bot.png";
import Close from "./image/robot-chat-bot- cancel.png";
import Doctor from "./image/doctor.png";
import Patient from "./image/patient.png";

const Home = () => {
  const navigate = useNavigate();
  const [isIframeVisible, setIframeVisible] = useState(false); // State to manage iframe visibility

  const handleDoctorClick = () => {
    navigate("/LoginForDoctor"); // Navigate to the Form page for Doctor
  };

  const handlePatientClick = () => {
    navigate("/patients"); // Placeholder for patient click
  };

  const toggleIframe = () => {
    setIframeVisible((prev) => !prev); // Toggle iframe visibility
  };

  return (
    <div className="home">
      <center>
        <h1 className="title">Who are You?</h1>
        <div className="containerForImg">
          <div className="option" onClick={handleDoctorClick}>
            <img src={Doctor} alt="Doctor Icon" className="img1" />
            <span className="label">Doctor</span>
          </div>
          <div className="option" onClick={handlePatientClick}>
            <img src={Patient} alt="Patient Icon" className="img2" />
            <span className="label">Patient</span>
          </div>

          {/* Chatbot Open Button */}
          {!isIframeVisible && (
            <div className="chat-boot" onClick={toggleIframe}>
              <img src={Open} alt="Start Chat" className="open-img"/>
            </div>
          )}

          {/* Chatbot Close Button */}
          {isIframeVisible && (
            <div className="chat-boot-cancel" onClick={toggleIframe}>
              <img src={Close} alt="Cancel Chat"  className="close-img"/>
            </div>
          )}

          {/* Iframe Container */}
          {isIframeVisible && (
            <div className="iframe-container">
              <iframe
                src="https://dr-bot-heart-chatbot-1.onrender.com/"
                title="Chatbot"
              ></iframe>
            </div>
          )}
        </div>
      </center>
    </div>
  );
};

export default Home;
