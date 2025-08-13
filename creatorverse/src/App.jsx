import React from "react";
import { useRoutes } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import ViewCreator from "./pages/ViewCreator";
import TestAddCreator from "./pages/TestAddCreator";
import "./styles.css";

const App = () => {
  const routes = useRoutes([
    { path: "/", element: <ShowCreators /> },
    { path: "/creator/:id", element: <ViewCreator /> },
    { path: "/add", element: <AddCreator /> },
    { path: "/edit/:id", element: <EditCreator /> },
    { path: "/test", element: <TestAddCreator /> },
  ]);
  return <div className="App">{routes}</div>;
};

export default App;
