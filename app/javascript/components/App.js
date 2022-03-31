import { css, Global } from "@emotion/react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewRecipe from "./pages/NewRecipe";
import Recipe from "./pages/Recipe";

const App = () => {
  return (
    <>
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Montserrat:wght@600&display=swap");
          * {
            font-family: "Inter";
            color: rgb(107 114 128) 
          }
          body {
            background-color: rgba(254, 243, 199, 1);
          }
          h1 {
            font-family: "Montserrat";
          }
        `}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Recipe />} />
          <Route path="new-recipe" element={<NewRecipe />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
