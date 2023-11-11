import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('api/posts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
            });
    }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {posts.map(post =>
            <div key={post.id}>
                {post.title}
            </div>
        )}
      </header>
    </div>
  );
}

export default App;
