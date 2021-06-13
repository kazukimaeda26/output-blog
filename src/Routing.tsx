import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/home/Home";
import AdminHome from "./components/adminHome/AdminHome";

const Routing = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/admin" component={AdminHome} />
    </BrowserRouter>
  );
};

export default Routing;
