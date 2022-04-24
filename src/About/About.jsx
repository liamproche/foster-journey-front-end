import LoginComponent from "../LoginComponent/LoginComponent";
import './About.css'

function About() {
    return (
      <div className="About">
        <section className="about-container">
          <h2 key="about-header">About</h2>
          <p key="about-paragraph">Foster journey is an online journal designed to help foster youth keep track of the placements they have visited throughout their individual journeys. Users can create entries for each placement they can later refer back to while trying to track their own personal journey through the care system. This can often be a difficult task given the vast number of locations, caregivers and short-duration stays they may encounter.</p>
        </section>
        <LoginComponent></LoginComponent>
      </div>
    );
  }
  
  export default About;