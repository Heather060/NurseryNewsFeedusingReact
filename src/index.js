import React from 'react';
import ReactDOM from 'react-dom/client';
import Feed from "./components/feed";


function App(){

  return (
    <div className="app">
    <header>
      <h1>News Feed</h1>
    </header>
    <main>
      <Feed />
    </main>
  </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
);


