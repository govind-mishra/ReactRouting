import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import Posts from "../Posts/Posts";
import asynccomponent from '../../HOC/asyncComponent';
//import NewPosts from "../NewPost/NewPost";
import "./Blog.css";
const AsyncNewPost = asynccomponent(()=>{
    return import("../NewPost/NewPost");
});

class Blog extends Component {
  state = {
    auth: true
  };
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink exact to="/posts/">
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true"
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <Switch>
          {/*Using only route will impose the page reload so to prevent it we should not use normal anchor link but Link component*/}
          {this.state.auth ? (
            <Route path="/new-post" component={AsyncNewPost}></Route>
          ) : null}
          <Route path="/posts" component={Posts}></Route>
          {/* <Redirect from="/" to="/posts"></Redirect> //comment it because it will not work if you want to render for 404 error */}
          <Route render={() =><h1>Not found</h1>} />
          {/*here component is in lowercase it is property of Route tag here the path will be same as above given in link Home */}
        </Switch>
        {/* <Route path="/" render={() => <h1>Home</h1>}></Route> if the route component find the given path then render the component */}
      </div>
    );
  }
}

export default Blog;
