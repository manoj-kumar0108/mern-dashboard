import React from 'react';
import { NavLink } from 'react-router-dom';

function Error() {
  return (
    <>
      <section
        id="error-page"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#f8f9fa',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <div
          className="content"
          style={{
            maxWidth: '500px',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2
            className="header"
            style={{
              fontSize: '6rem',
              margin: '0 0 20px',
              color: '#da1021',
            }}
          >
            404
          </h2>
          <h4 style={{ marginBottom: '10px', color: '#333' }}>
            Sorry! Page not found
          </h4>
          <p style={{ marginBottom: '20px', color: '#555' }}>
            Oops! It seems like the page you're trying to access doesn't exist.
            If you believe there's an issue, feel free to report it, and we'll
            look into it.
          </p>
          <div
            className="btns"
           
          >
            <NavLink
              to="/"
              
            >
              Return Home
            </NavLink>
            <NavLink
              to="/contact"
            
            >
              Report Problem
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
}

export default Error;
