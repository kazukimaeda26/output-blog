import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import AdminAuth from "./components/adminAuth/AdminAuth";
import AdminHome from "./components/adminHome/AdminHome";
import BlogNew from "./components/blogNew/BlogNew";
import BlogEdit from "./components/blogEdit/BlogEdit";
import BlogShow from "./components/blogShow/BlogShow";
const Routing = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin-auth" component={AdminAuth} />
        <Route exact path="/admin-home" component={AdminHome} />
        <Route exact path="/admin/blog/new" component={BlogNew} />
        <Route path="/admin/blog/edit/:blogId" component={BlogEdit} />
        <Route path="/blog/:blogId" component={BlogShow} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routing;
