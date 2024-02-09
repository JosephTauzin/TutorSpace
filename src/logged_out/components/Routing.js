import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";


//import Home from "./home/Home";

//import About from "./about/about"

//import Login from "./Login/Login";


import About from "./updated_frontpage/about/About";
import Home from "./updated_frontpage/homepage/Home";
import Login from "./updated_frontpage/Login/Login";
import "./updated_frontpage/index.css";

//import Main from "./updated_frontpage/main";


import useLocationBlocker from "../../shared/functions/useLocationBlocker";

function Routing(props) {
  const { blogPosts, selectBlog, selectHome } = props;
  
  return (
<Switch>

   
       <PropsRoute
        exact
        path="/about"
        component={About}
      
      />
      <PropsRoute
        exact
        path="/login"
        component={Login}
      
      />
      <PropsRoute path="/" component={Home} selectHome={selectHome} />
    </Switch>
    

  );
}

/*
<Switch>
      {blogPosts.map((post) => (
        <PropsRoute
          path={post.url}
          component={BlogPost}
          title={post.title}
          key={post.title}
          src={post.src}
          date={post.date}
          content={post.content}
          otherArticles={blogPosts.filter(
            (blogPost) => blogPost.id !== post.id
          )}
        />
      ))}
      <PropsRoute
        exact
        path="/blog"
        component={Blog}
        selectBlog={selectBlog}
        blogPosts={blogPosts}
      />
       <PropsRoute
        exact
        path="/about"
        component={About}
      
      />
      <PropsRoute
        exact
        path="/login"
        component={Login}
      
      />
      <PropsRoute path="/" component={Home} selectHome={selectHome} />
    </Switch>
*/

Routing.propTypes = {
  blogposts: PropTypes.arrayOf(PropTypes.object),
  selectHome: PropTypes.func.isRequired,
  selectBlog: PropTypes.func.isRequired,
};

export default memo(Routing);
