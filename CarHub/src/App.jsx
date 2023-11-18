import './App.css';
import React, { useState } from 'react';
import { useRoutes, Link } from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import ShowPost from './pages/ShowPost';

const App = () => {
  const [post, setPost] = useState([]);

  // Function to add a new Crewmate to the crewmate state
  const addPost = (newPost) => {
    setPost([...post, newPost]);
  };

  // Sets up routes
  let element = useRoutes([
    {
      path: "/new",
      element: <CreatePost addPost={addPost} />,
    },
    {
      path:"/",
      element: <ShowPost/>
    }

  ]);
  
  return (
    <div className="App">
      <div className="header">
        <h1>CarHub</h1>
        <Link to="/"><button className="headerBtn"> Gallery </button></Link>
        <Link to="/new"><button className="headerBtn"> Create Post </button></Link>
      </div>
      {element}
    </div>
  );
}

export default App;