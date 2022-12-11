import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./Routes/routes";
import { useEffect } from "react";
import NotFound from "./pages/NotFound";

function App() {
  const screenWidth = window.innerWidth;

  if (screenWidth <640) {
    return (
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Routes>
      </Router>
    );
  } else {
    return <NotFound />;
  }
}

export default App;
