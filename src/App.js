import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Create from "./components/Create";
import ArticleDetails from "./components/ArticleDetails";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Registration from "./components/Registration";
import VerifyCode from "./components/VerifyCode";
import { AuthProvider } from "./components/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchResultsPage from "./components/SearchResultsPage";
import UserProfilePage from "./components/UserProfilePage";
function App() {
  return (
    <Router>
      <AuthProvider>
        {" "}
        {/* Додайте AuthProvider тут */}
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<Create />} />
              <Route path="/article/:id" element={<ArticleDetails />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/users/:userId" element={<UserProfilePage />} />{" "}
              <Route path="/code" element={<VerifyCode />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/results" element={<SearchResultsPage />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>{" "}
      {/* Кінець AuthProvider */}
    </Router>
  );
}

export default App;
