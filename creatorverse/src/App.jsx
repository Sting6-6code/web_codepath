import React from "react";
import { useRoutes } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import ViewCreator from "./pages/ViewCreator";

import "./styles.css";

const App = () => {
  const routes = useRoutes([
    { path: "/", element: <ShowCreators /> },
    { path: "/creator/:id", element: <ViewCreator /> },
    { path: "/add", element: <AddCreator /> },
    { path: "/edit/:id", element: <EditCreator /> },
  ]);
  return <div className="App">{routes}</div>;
};

export default App;
