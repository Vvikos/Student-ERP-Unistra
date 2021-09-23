import React, { useState } from "react";

function App() {
  const [word, setWord] = React.useState('software');
  const [associations, setAssociations] = React.useState(null);

  const getAssociations = () => {
    fetch('/api/' + word)
      .then(result => result.json())
      .then(body => setAssociations(body));
  };

  return (
    <div className="app">
      <h1>Word Associations Map</h1>
      <input value={word} onChange={e => setWord(e.target.value)} />
      <button onClick={getAssociations}>Find Associations</button>
      {associations && (
        Object.keys(associations).length === 0
          ? <p>No results</p>
          : <div>
            {Object.entries(associations).map(([association, score]) => (
              <span style={{ fontSize: Math.pow(score, 2) / 200 }}>
                {association + ' => ' + score}
                {' '}
              </span>
            ))}
          </div>
      )}
    </div>
  );
}

export default App;