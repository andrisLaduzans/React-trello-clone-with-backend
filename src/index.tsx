import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend as Backend } from "react-dnd-html5-backend";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.css";
import { AppStateProvider } from "./state/AppStateContext";


ReactDOM.render(
  <React.StrictMode>
    <DndProvider backend={Backend}>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </DndProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
