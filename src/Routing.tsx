import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import AdminHome from "./components/adminHome/AdminHome";
import OutputNew from "./components/outputNew/OutputNew";
import OutputEdit from "./components/outputEdit/OutputEdit";

const Routing = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={AdminHome} />
        <Route exact path="/output/new" component={OutputNew} />
        <Route path="/blog/edit/:blogId" component={OutputEdit} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routing;
