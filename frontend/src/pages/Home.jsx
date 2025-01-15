import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom'

const PORT = 5000;

const Home = () => {
  const [faculties, setFaculties] = useState([]);
  const [filteredFaculties, setFilteredFaculties] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [ratings, setRatings] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [isFeedBack, setFeedBack] = useState(false)


  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch('http://localhost:5000/api/faculty')
      .then((response) => response.json())
      .then((data) => {
        setFaculties(data);
        setFilteredFaculties(data);
        const uniqueSubjects = [...new Set(data.map(faculty => faculty.subject))];
        setSubjects(['All', ...uniqueSubjects]);
        (token) ? setFeedBack(true) : setFeedBack(false);
        if (token) {
          setFeedBack(true);
        } else {
          setFeedBack(false);
        }
      })
      .catch((error) => console.error("Error fetching faculty data: ", error));
  }, []);


  const handleFilterChange = (subject) => {
    setSelectedSubject(subject);
    if (subject === 'All') {
      setFilteredFaculties(faculties);
    } else {
      setFilteredFaculties(faculties.filter(faculty => faculty.subject === subject));
    }
  };


  const handleStarClick = (facultyId, rating) => {
    setRatings((prevRatings) => ({ ...prevRatings, [facultyId]: rating }));
  };

  const renderStars = (facultyId, currentRating) => {
    const rating = ratings[facultyId] || currentRating;
    return [...Array(5)].map((_, i) => (
      <span
        key={i + 1}
        className={`star ${i + 1 <= rating ? 'filled' : ''}`}
        onClick={() => handleStarClick(facultyId, i + 1)}
      >
        {i + 1 <= rating ? '★' : '☆'}
      </span>
    ));
  };

  const handleFeedbackChange = (facultyId, event) => {
    setFeedbacks((prevFeedbacks) => ({
      ...prevFeedbacks,
      [facultyId]: event.target.value,
    }));
  };


  const handleFeedbackSubmit = async (facultyId, facultyName, index) => {
    const feedbackText = feedbacks[facultyId];
    if (!feedbackText) return;
    const enrollment = localStorage.getItem("enrollment");
    const resp = await fetch(`http://localhost:${PORT}/user/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ facultyId, facultyName, feedbackText, enrollment })
    })
    const response = await resp.json();
    if (resp.ok) {
      setShowModal(true);
      setFeedbacks((prevFeedbacks) => ({ ...prevFeedbacks, [facultyId]: "" }));
      setTimeout(() => setShowModal(false), 1000);
      setshowArray([...showArray, show])
    }
    else {
      alert(response.message)
    }
  }


  return (
    <div className="home-container">
      <header className="header">
        <h1>Faculty Feedback System</h1>
      </header>


      {(isFeedBack) ? "" : <p className='warning'><Link to="/login">Login to submit FeedBack</Link></p>}


      <div className="content">
        <div className="filter-container">
          <select
            value={selectedSubject}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="filter-dropdown"
          >
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        <div className="faculty-cards">
          {filteredFaculties.map((faculty, index) => (
            <>
            
              <div key={index} className="faculty-card">
                <img
                  src={faculty.image || 'https://via.placeholder.com/150'}
                  alt={faculty.name}
                  className="faculty-image"
                />
                <div className="faculty-info">
                  <h3 className="faculty-name">{faculty.name}</h3>
                  <p><strong>Subject:</strong> {faculty.subject}</p>
                  <p><strong>Experience:</strong> {faculty.experience}</p>
                  <p><strong>Qualification:</strong> {faculty.qualification}</p>

                  <div className="star-rating">
                    <p><strong>Rate this Faculty:</strong></p>
                    <div>{renderStars(faculty._id, 3)}</div>
                  </div>

                  {/* submit feedback toggle*/}
                  {(isFeedBack) ? <div key={index} id={index} className="feedback-section">
                    <textarea
                      value={feedbacks[faculty._id] || ''}
                      onChange={(event) => handleFeedbackChange(faculty._id, event)}
                      placeholder="Write your feedback here..."
                      rows="4"
                      className="feedback-input"
                    />
                    <button
                      onClick={() => handleFeedbackSubmit(faculty._id, faculty.name, index)}
                      className="submit-feedback">
                      Submit Feedback
                    </button>
                  </div> : ""}

                </div>
              </div>
            </>
          ))}
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <p>Feedback Submitted!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

