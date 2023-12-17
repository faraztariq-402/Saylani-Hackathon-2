import React, { useState,useEffect } from 'react';
import Drawer from '../../components/drawer';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import profile2 from '../../assets/profilepic2.png'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { FaCamera  } from "react-icons/fa";
import { getFirestore, addDoc, collection,getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
const firebaseConfig = {
  apiKey: "AIzaSyCOP_hXVbZI6wUXmKPJDn4FIwvJ-P0kITc",
  authDomain: "smit-hackathon-28e8e.firebaseapp.com",
  projectId: "smit-hackathon-28e8e",
  storageBucket: "smit-hackathon-28e8e.appspot.com",
  messagingSenderId: "93871507588",
  appId: "1:93871507588:web:62496689d0b131c1eedad1",
  measurementId: "G-8T7RWY4MNM"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const AdminStudents = () => {
  const [currentPage, setCurrentPage] = useState('');
  const [open, setOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = React.createRef();
  const [students, setStudents] = useState([]);
  const [sequentialId, setSequentialId] = useState(1); // Initialize with 1

  const [studentData, setStudentData] = useState({
    photoUrl: '', // Added photoUrl to studentData
    // ... other student data fields
  });


  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleAddStudent = async () => {
    try {
      // Upload the profile photo to Firebase Storage
      const photoRef = storageRef(storage, `profile_photos/${studentData.firstName}_${studentData.lastName}`);
      await uploadBytes(photoRef, selectedFile);
  
      // Get the download URL of the uploaded photo
      const photoUrl = await getDownloadURL(photoRef);
  
      // Add the student data to the Firestore collection with the photo URL
      const addedDocRef = await addDoc(collection(db, 'students'), {
        ...studentData,
        photoUrl,
      });
  
      console.log('Student added with ID: ', addedDocRef.id);
  
      // Fetch students again to update the table
      fetchStudents();
  
      // Reset or clear the form fields if needed
      setStudentData({
        firstName: '',
        lastName: '',
        course: '',
        password: '',
        email: '',
        phoneNumber: '',
        photoUrl: '', // Clear the photoUrl field as well
      });
      setSelectedFile(null);
  
      // Close the modal
      handleModalClose();
    } catch (error) {
      console.error('Error adding student: ', error);
    }
  };
  const openFileInput = () => {
    fileInputRef.current.click();
  };
  const fetchStudents = async () => {
    try {
      const studentsCollection = collection(db, 'students');
      const studentsSnapshot = await getDocs(studentsCollection);
      const studentsData = studentsSnapshot.docs.map((doc, index) => ({
        id: index + 1, // Calculate sequential ID
        ...doc.data(),
      }));
      setStudents(studentsData);
      setSequentialId(studentsData.length + 1); // Update sequentialId for the next ID
    } catch (error) {
      console.error('Error fetching students: ', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []); // Fetch students on component mount

  return (
    <div>
      <Drawer open={open} setOpen={setOpen} setCurrentPage={setCurrentPage} />
      <div style={{ marginLeft: open ? '230px' : '0', transition: 'margin 0.3s' }}>
        {/* Rest of your application content */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<div style={{display:'flex',alignItems:'center',gap:10}}>
<div style={{border:'1px solid gray',borderRadius:50,display:'flex',gap:10,height:80,width:80}}>
<img src={profile2} style={{height:80,width:80,borderRadius:50}}>

</img>
</div>
<h1>Add Student</h1>
</div>

<div style={{ marginRight: 10 }}>
  <button

      style={{ height: 10, backgroundColor: 'gray', padding: 13, display: 'flex', justifyContent: 'center', alignItems: 'center', outline: 'none', border: 'none', borderRadius: 5 }}
   
    onClick={handleModalOpen} 
  >
    Add Student
  </button>
</div>



</div>
        {/* ... existing content ... */}

        {/* Modal for adding a student */}
        <Modal open={isModalOpen} onClose={handleModalClose}>
          <Box sx={{ width: 300, padding: 2, position: 'absolute', top: '50%', left: '60%', transform: 'translate(-50%, -50%)', backgroundColor: 'white' }}>
            {/* Add input fields for student information */}
<div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10}}>
<div style={{ border: '1px solid gray', borderRadius: 50, display: 'flex', gap: 10, height: 80, width: 80 }}>
              <FaCamera
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 50,
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onClick={openFileInput}
              />
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </div>
            <Input placeholder="First Name" value={studentData.firstName} onChange={(e) => setStudentData({ ...studentData, firstName: e.target.value })} />
            <Input placeholder="Last Name" value={studentData.lastName} onChange={(e) => setStudentData({ ...studentData, lastName: e.target.value })} />
            <Input placeholder="Course" value={studentData.course} onChange={(e) => setStudentData({ ...studentData, course: e.target.value })} />
            <Input placeholder="Password" value={studentData.password} onChange={(e) => setStudentData({ ...studentData, password: e.target.value })} />
            <Input placeholder="Email" value={studentData.email} onChange={(e) => setStudentData({ ...studentData, email: e.target.value })} />
            <Input placeholder="Phone Number" value={studentData.phoneNumber} onChange={(e) => setStudentData({ ...studentData, phoneNumber: e.target.value })} />

            {/* Add more input fields as needed */}

            {/* Button to add the student */}
            <button style={{ height: 10,width:80, backgroundColor: 'gray', padding: 13, display: 'flex', justifyContent: 'center', alignItems: 'center', outline: 'none', border: 'none', borderRadius: 5 }} onClick={handleAddStudent}>Add</button>
            </div>
          </Box>
        </Modal>
        <table style={{ width: '100%', marginTop: 20, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile</th>
            <th>Course</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td style={{textAlign:'center'}}>{student.id}</td>
              <td style={{textAlign:'center'}}>
                <img src={student.photoUrl} alt="Profile" style={{ width: 50, height: 50, borderRadius: '50%' }} />
              </td>
              <td style={{textAlign:'center'}}>{student.course}</td>
              <td style={{textAlign:'center'}}>{student.password}</td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </div>
  );
};

export default AdminStudents;







