import React, { useState, useEffect } from 'react';
import { useAuth } from "../store/auth";

function About() {

  const { user } = useAuth();



  return (
    <div>
      <p>Welcome {user ? `${user.username} to our website`: `to our website`}</p>
      <br/>
      
      <h2>Why choose us</h2>
      <div >
        <ul >
          <li>
            <strong>NAAC Excellence:</strong> Awarded 'A++' Grade with a CGPA of 3.71.
          </li>
          <li>
            <strong>NIRF Ranking 2024:</strong> JAIN (Deemed-to-be University) ranks 85th in India.
          </li>
          <li>
            <strong>Top BCA Colleges:</strong> School of Computer Science & IT is ranked No.1 under Top 10 Emerging BCA Colleges in India by India Today - 2024.
          </li>
        </ul>
        <ul >
          <li>
            <strong>Hi-Tech Laboratories:</strong> Equipped with the latest tools and technology for advanced research.
          </li>
          <li>
            <strong>Industry Collaborations:</strong> Partnerships with leading organizations for domain knowledge exchange and technical training.
          </li>
          <li>
            <strong>Industry-Driven Pedagogy:</strong> Focused on employability and superior skills.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default About;
