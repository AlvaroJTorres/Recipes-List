import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewRecipe from "./pages/NewRecipe";
import Recipe from "./pages/Recipe";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Recipe />} />
        <Route path="new-recipe" element={<NewRecipe />} />
      </Routes>
    </Router>
  );
};

export default App;
