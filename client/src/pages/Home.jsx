import React from 'react';

function Home() {
  const backgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/photo-1519125323398-675f0ddb6308')", // Direct link to an image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    margin: 0, // Ensures no margin around the container
    padding: 0, // Ensures no padding inside the container
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)',
  };

  return (
    <div style={backgroundStyle}>
      <h1>Welcome to Home Page</h1>
    </div>
  );
}

export default Home;
