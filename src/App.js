import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div>
      {authIsReady && (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={!user ? <Navigate to="/login" /> : <Home />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
        </Routes>
      </BrowserRouter>
      )}
      {!authIsReady && (
        <p className=' text-center w-full text-xl mx-auto mt-2'>Loading..</p>
      )}
    </div>
  );
}

export default App
