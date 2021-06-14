import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/home/Home";
import AdminHome from "./components/adminHome/AdminHome";
import OutputNew from "./components/outputNew/OutputNew";

const Routing = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/admin" component={AdminHome} />
      <Route exact path="/output/new" component={OutputNew} />
    </BrowserRouter>
  );
};

export default Routing;
