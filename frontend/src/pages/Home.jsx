import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [faculties, setFaculties] = useState([]);
  const [filteredFaculties, setFilteredFaculties] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [ratings, setRatings] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/faculty')
      .then((response) => response.json())
      .then((data) => {
        setFaculties(data);
        setFilteredFaculties(data);

        const uniqueSubjects = [...new Set(data.map(faculty => faculty.subject))];
        setSubjects(['All', ...uniqueSubjects]);
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

  const handleFeedbackSubmit = (facultyId) => {
    const feedbackText = feedbacks[facultyId];
    if (!feedbackText) return;

    setShowModal(true);
    setFeedbacks((prevFeedbacks) => ({ ...prevFeedbacks, [facultyId]: "" }));

    setTimeout(() => setShowModal(false), 1000);
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>Faculty Feedback System</h1>
      </header>

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

                  <div className="feedback-section">
                    <textarea
                      value={feedbacks[faculty._id] || ''}
                      onChange={(event) => handleFeedbackChange(faculty._id, event)}
                      placeholder="Write your feedback here..."
                      rows="4"
                      className="feedback-input"
                    />
                    <button
                      onClick={() => handleFeedbackSubmit(faculty._id)}
                      className="submit-feedback"
                    >
                      Submit Feedback
                    </button>
                  </div>
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











































// import React, { useState, useEffect } from 'react';
// import './Home.css'; // Import the CSS file

// const Home = () => {
//   const [faculties, setFaculties] = useState([]);
//   const [filteredFaculties, setFilteredFaculties] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState('All');

//   // State to store selected ratings
//   const [ratings, setRatings] = useState({});

//   // Fetch faculty data from the backend
//   useEffect(() => {
//     fetch('http://localhost:5000/api/faculty')
//       .then((response) => response.json())
//       .then((data) => {
//         setFaculties(data);
//         setFilteredFaculties(data);

//         // Collect unique subjects for the filter dropdown
//         const uniqueSubjects = [...new Set(data.map(faculty => faculty.subject))];
//         setSubjects(['All', ...uniqueSubjects]);
//       })
//       .catch((error) => {
//         console.error("Error fetching faculty data: ", error);
//       });
//   }, []);

//   const handleFilterChange = (subject) => {
//     setSelectedSubject(subject);

//     if (subject === 'All') {
//       setFilteredFaculties(faculties);
//     } else {
//       const filtered = faculties.filter(faculty => faculty.subject === subject);
//       setFilteredFaculties(filtered);
//     }
//   };

//   // Handle star rating change
//   const handleStarClick = (facultyId, rating) => {
//     setRatings((prevRatings) => ({
//       ...prevRatings,
//       [facultyId]: rating,
//     }));
//   };

//   const renderStars = (facultyId, currentRating) => {
//     const rating = ratings[facultyId] || currentRating;
//     let stars = [];

//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <span
//           key={i}
//           className={`star ${i <= rating ? 'filled' : ''}`}
//           onClick={() => handleStarClick(facultyId, i)}
//         >
//           {i <= rating ? '★' : '☆'}
//         </span>
//       );
//     }

//     return stars;
//   };

//   return (
//     <div className="home-container">
//       <header className="header">
//         <h1>Faculty Feedback System</h1>
//       </header>

//       <div className="content">
//         <div className="filter-container">
//           <select
//             value={selectedSubject}
//             onChange={(e) => handleFilterChange(e.target.value)}
//             className="filter-dropdown"
//           >
//             {subjects.map((subject, index) => (
//               <option key={index} value={subject}>{subject}</option>
//             ))}
//           </select>
//         </div>

//         <div className="faculty-cards">
//           {filteredFaculties.map((faculty, index) => (
//             <div key={index} className="faculty-card">
//               {/* Render the image from the database URL */}
//               <img
//                 src={faculty.image || 'https://via.placeholder.com/150'}
//                 alt={faculty.name}
//                 className="faculty-image"
//               />
//               <div className="faculty-info">
//                 <h3 className="faculty-name">{faculty.name}</h3>
//                 <p><strong>Subject:</strong> {faculty.subject}</p>
//                 <p><strong>Experience:</strong> {faculty.experience}</p>
//                 <p><strong>Qualification:</strong> {faculty.qualification}</p>

//                 {/* Star Rating */}
//                 <div className="star-rating">
//                   <p><strong>Rate this Faculty:</strong></p>
//                   <div>{renderStars(faculty._id, 3)}</div> {/* Default rating is 3 */}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <footer className="footer">
//         <p>&copy; 2025 Faculty Feedback System. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Home;






















// import React, { useState, useEffect } from 'react';
// import './Home.css'; // Import the CSS file

// const Home = () => {
//   const [faculties, setFaculties] = useState([]);
//   const [filteredFaculties, setFilteredFaculties] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState('All');

//   useEffect(() => {
//     fetch('http://localhost:5000/api/faculty')
//       .then((response) => response.json())
//       .then((data) => {
//         setFaculties(data);
//         setFilteredFaculties(data);

//         // Collect unique subjects for the filter dropdown
//         const uniqueSubjects = [...new Set(data.map(faculty => faculty.subject))];
//         setSubjects(['All', ...uniqueSubjects]);
//       })
//       .catch((error) => {
//         console.error("Error fetching faculty data: ", error);
//       });
//   }, []);

//   const handleFilterChange = (subject) => {
//     setSelectedSubject(subject);

//     if (subject === 'All') {
//       setFilteredFaculties(faculties);
//     } else {
//       const filtered = faculties.filter(faculty => faculty.subject === subject);
//       setFilteredFaculties(filtered);
//     }
//   };

//   return (
//     <div className="home-container">
//       <header className="header">
//         <h1>Faculty Feedback System</h1>
//       </header>

//       <div className="content">
//         <div className="filter-container">
//           <select
//             value={selectedSubject}
//             onChange={(e) => handleFilterChange(e.target.value)}
//             className="filter-dropdown"
//           >
//             {subjects.map((subject, index) => (
//               <option key={index} value={subject}>{subject}</option>
//             ))}
//           </select>
//         </div>

//         <div className="faculty-cards">
//           {filteredFaculties.map((faculty, index) => (
//             <div key={index} className="faculty-card">
//               <img src={faculty.image || 'https://via.placeholder.com/150'} alt={faculty.name} className="faculty-image" />
//               <div className="faculty-info">
//                 <h3 className="faculty-name">{faculty.name}</h3>
//                 <p><strong>Subject:</strong> {faculty.subject}</p>
//                 <p><strong>Experience:</strong> {faculty.experience}</p>
//                 <p><strong>Qualification:</strong> {faculty.qualification}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <footer className="footer">
//         <p>&copy; 2025 Faculty Feedback System. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Home;








































// import React, { useState, useEffect } from 'react';
// import './Home.css';
// // Home Component
// const Home = () => {
//   const [faculties, setFaculties] = useState([]);
//   const [filteredFaculties, setFilteredFaculties] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState('All');

//   // Fetch faculty data from the backend
//   useEffect(() => {
//     fetch('http://localhost:5000/api/faculty')
//       .then((response) => response.json())
//       .then((data) => {
//         setFaculties(data);
//         setFilteredFaculties(data);

//         // Collect unique subjects for the filter dropdown
//         const uniqueSubjects = [...new Set(data.map(faculty => faculty.subject))];
//         setSubjects(['All', ...uniqueSubjects]);
//       })
//       .catch((error) => {
//         console.error("Error fetching faculty data: ", error);
//       });
//   }, []);

//   // Handle filtering of faculties based on the selected subject
//   const handleFilterChange = (subject) => {
//     setSelectedSubject(subject);

//     if (subject === 'All') {
//       setFilteredFaculties(faculties);
//     } else {
//       const filtered = faculties.filter(faculty => faculty.subject === subject);
//       setFilteredFaculties(filtered);
//     }
//   };

//   return (
//     <div className="home-container">
//       <div className="filter-container">
//         {/* Filter Dropdown */}
//         <select
//           value={selectedSubject}
//           onChange={(e) => handleFilterChange(e.target.value)}
//           className="filter-dropdown"
//         >
//           {subjects.map((subject, index) => (
//             <option key={index} value={subject}>{subject}</option>
//           ))}
//         </select>
//       </div>

//       <div className="faculty-cards">
//         {/* Faculty Cards */}
//         {filteredFaculties.map((faculty, index) => (
//           <div key={index} className="faculty-card">
//             <img src={faculty.image || 'https://via.placeholder.com/150'} alt={faculty.name} className="faculty-image" />
//             <div className="faculty-info">
//               <h3 className="faculty-name">{faculty.name}</h3>
//               <p><strong>Subject:</strong> {faculty.subject}</p>
//               <p><strong>Experience:</strong> {faculty.experience}</p>
//               <p><strong>Qualification:</strong> {faculty.qualification}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;























// import React, { useEffect, useState } from 'react';
// import './home.css';

// const Home = () => {
//     const [facultyData, setFacultyData] = useState([]);
//     const [selectedLanguage, setSelectedLanguage] = useState('all');
//     const [feedbackText, setFeedbackText] = useState('');
//     const [selectedFacultyId, setSelectedFacultyId] = useState(null);

//     useEffect(() => {
//         fetch('http://localhost:5000/api/faculty')
//             .then(response => response.json())
//             .then(data => setFacultyData(data))
//             .catch(error => console.error('Error fetching data:', error));
//     }, []);

//     const handleFilterChange = (event) => {
//         setSelectedLanguage(event.target.value);
//     };

//     const handleFeedbackChange = (e) => {
//         setFeedbackText(e.target.value);
//     };

//     const handleFeedbackSubmit = (facultyId) => {
//         if (!feedbackText) {
//             alert("Please enter feedback before submitting.");
//             return;
//         }

//         // Send feedback to backend
//         fetch('http://localhost:5000/api/feedback', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 facultyId,  // Faculty ID to which the feedback belongs
//                 feedbackText,
//             }),
//         })
//             .then(response => response.json())
//             .then(() => {
//                 alert('Your feedback has been submitted!');
//                 setFeedbackText('');  // Clear feedback after submitting
//             })
//             .catch(error => console.error('Error submitting feedback:', error));
//     };

//     return (
//         <div>
//             <header>
//                 <h1>Faculty Feedback System</h1>
//             </header>

//             <div className="container">
//                 <div className="filter">
//                     <label htmlFor="languageSelect">Filter by Language: </label>
//                     <select
//                         id="languageSelect"
//                         value={selectedLanguage}
//                         onChange={handleFilterChange}
//                     >
//                         <option value="all">All</option>
//                         <option value="python">Python</option>
//                         <option value="java">Java</option>
//                         <option value="mern">MERN</option>
//                         <option value="datascience">Data Science</option>
//                         <option value="cplusplus">C++</option>
//                     </select>
//                 </div>

//                 <div id="cards-container" className="cards-container">
//                     {facultyData.filter(faculty => selectedLanguage === 'all' || faculty.subject.toLowerCase() === selectedLanguage).map(faculty => (
//                         <div className={`card ${faculty.subject.toLowerCase()}`} key={faculty._id}>
//                             <img src={faculty.image} alt={`${faculty.name} Faculty`} />
//                             <h3>{faculty.name}</h3>
//                             <p><strong>Subject:</strong> {faculty.subject}</p>
//                             <p><strong>Experience:</strong> {faculty.experience}</p>
//                             <p><strong>Qualification:</strong> {faculty.qualification}</p>

//                             {/* Feedback Section */}
//                             <div className="feedback-form">
//                                 <textarea
//                                     value={feedbackText}
//                                     onChange={handleFeedbackChange}
//                                     placeholder="Enter your feedback here..."
//                                 ></textarea>
//                                 <button onClick={() => handleFeedbackSubmit(faculty._id)}>
//                                     Submit Feedback
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <footer>
//                 <p>&copy; 2025 Faculty Feedback System. All Rights Reserved.</p>
//             </footer>
//         </div>
//     );
// };

// export default Home;
