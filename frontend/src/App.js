// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HelpRequestPage from "./pages/HelpRequestPage/HelpRequstPage";
import NewsPage from "./pages/NewsPage/NewsPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div className="row AppContainer">
      <div className="col-md-12 col-xs-12 col-lg-12">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/helprequests"
          element={
            <PrivateRoute>
              <HelpRequestPage />
            </PrivateRoute>
          }
        />
        <Route path='/newspage' element={
        <PrivateRoute>
          <NewsPage />
        </PrivateRoute>} />
      </Routes>
      <Footer />
      </div>
    </div>
  );
}

export default App;
