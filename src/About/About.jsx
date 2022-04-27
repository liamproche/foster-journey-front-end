import { useState, useEffect } from 'react';
import LoginComponent from "./LoginComponent/LoginComponent";

function About(props) {
  const findAveragePlacements = () =>{ 
    let placementArr = props.users.map((user)=>{
      return user.placements
    })
    let sum = 0
    for(let num of placementArr){
      sum += num
    }
    return sum / props.users.length
  }
  return (
      <div className="About">
        <section className="about-container">
          <h2 key="about-header">About</h2>
          <p key="about-paragraph">Foster journey is an online journal designed to help foster youth keep track of the placements they have visited throughout their individual journeys. Users can create entries for each placement they can later refer back to while trying to track their own personal journey through the care system. This can often be a difficult task given the vast number of locations, caregivers and short-duration stays they may encounter.</p>
        </section>
        <section className="login-stats-container">
          <div className="stats-container">
            <h5>Average Stats Per User</h5>
            <h6>Number of Placements: {findAveragePlacements()}</h6>
            <h6>Number of Caregivers:</h6>
            <h6>Number of Siblings:</h6>
          </div>
          <LoginComponent></LoginComponent>
        </section>
      </div>
    );
  }
  
  export default About;