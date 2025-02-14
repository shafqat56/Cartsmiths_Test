import React, { useState, useEffect } from 'react';

function App() {
  const [quotes, setQuotes] = useState([]); 
  const [ratings, setRatings] = useState([]); 
  const [message, setMessage] = useState(''); 

  useEffect(() => {
    fetch('http://localhost:5000/quote') 
      .then((response) => response.json())
      .then((data) => {
        setQuotes(data); 
        setRatings(new Array(data.length).fill('')); 
      })
      .catch((error) => console.error('Error fetching quotes:', error));
  }, []);

  const handleRatingChange = (index, value) => {
    const updatedRatings = [...ratings];
    updatedRatings[index] = value; 
    setRatings(updatedRatings);
  };
  
  const handleSubmit = () => {
    fetch('http://localhost:5000/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ratings: ratings}), 
    })
      .then((response) => response.json())
      .then((data) => {
        setQuotes(data.quotes); 
        setMessage(data.message); 
      })
      .catch((error) => console.error('Error submitting ratings:', error));
  };

  return (
    <div className="container">
      <h1>Rate Quotes</h1>
      {quotes.map((quote, index) => (
        <div key={quote.id} >
          <p>{quote.text}</p>
          <input
            type="number"
            min="1"
            max="5"
            value={ratings[index] || ''}
            onChange={(e) => handleRatingChange(index, e.target.value)}
            placeholder="Enter Quotes Rating Here"
          />
          {quote.rating && <p>Current Rating: {quote.rating}</p>}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Ratings</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;