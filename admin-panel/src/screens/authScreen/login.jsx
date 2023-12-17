import { useState } from 'react';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/logo.png'
// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOP_hXVbZI6wUXmKPJDn4FIwvJ-P0kITc",
  authDomain: "smit-hackathon-28e8e.firebaseapp.com",
  projectId: "smit-hackathon-28e8e",
  storageBucket: "smit-hackathon-28e8e.appspot.com",
  messagingSenderId: "93871507588",
  appId: "1:93871507588:web:62496689d0b131c1eedad1",
  measurementId: "G-8T7RWY4MNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Logged in successfully
        const user = userCredential.user;
        console.log('User logged in:', user);
        navigate('../adminPanel'); // Use the appropriate route
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login error:', errorCode, errorMessage);
      });
  };

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
     
      <form onSubmit={handleLogin} style={{display:'flex',justifyContent:'center',flexDirection:'column',gap:'1rem'}}>
      <div>
        <img src={image}></img>
      </div>
      <input style={{height:20,borderRadius:5,outline:'none',border:'1px solid gray',padding:5}}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /> 
      <input style={{height:20,borderRadius:5,outline:'none',border:'1px solid gray',padding:5}}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={{height:30,borderRadius:5,outline:'none',border:'1px solid gray',padding:5,color:'white',backgroundColor:'gray'}}>Login</button>
      </form>
    </div>
  );
};

export default Login;