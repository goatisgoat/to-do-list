import "./App.css";
import React from "react";
import TodoComponent from "./component/TodoComponent";
import ProjectsList from "./component/ProjectsList";

function App() {
  return (
    <div className="container-app">
      <div>
        <ProjectsList />
        <TodoComponent />
      </div>
    </div>
  );
}

export default App;
