import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import AdminAuth from "./components/adminAuth/AdminAuth";
import BlogNew from "./components/blogNew/BlogNew";
import BlogEdit from "./components/blogEdit/BlogEdit";

const Routing = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin-auth" component={AdminAuth} />
        <Route exact path="/blog/new" component={BlogNew} />
        <Route path="/blog/edit/:blogId" component={BlogEdit} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routing;
