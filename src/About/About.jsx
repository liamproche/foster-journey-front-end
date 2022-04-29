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
  const findAverageParents = () =>{ 
    let parentsArr = props.users.map((user)=>{
      return user.foster_parents
    })
    let sum = 0
    for(let num of parentsArr){
      sum += num
    }
    return sum / props.users.length
  }
  const findAverageSiblings = () =>{ 
    let siblingsArr = props.users.map((user)=>{
      return user.foster_siblings
    })
    let sum = 0
    for(let num of siblingsArr){
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
        <section className="login-container color-overlay d-flex justify-content-center aligin-items-center">
          <div className="stats-container rounded p-4 p-sm-3">
            <h2 id="stats-header">Average User Stats</h2>
            <h6 className="stat">Number of Placements: {Math.round(findAveragePlacements())}</h6>
            <h6 className="stat">Number of Caregivers: {Math.round(findAverageParents())}</h6>
            <h6 className="stat">Number of Siblings: {Math.round(findAverageSiblings())}</h6>
          </div>
          <LoginComponent></LoginComponent>
        </section>
      </div>
    );
  }
  
  export default About;