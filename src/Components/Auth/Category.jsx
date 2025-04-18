import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";


function Category() {
  const [role, setRole] = useState("");
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const handleclick = (temprole) => {
    setRole(temprole);
    setVisible(false);

  };

  const handlenavigatefun = () => {
    if(role){
        navigate(`/register?role=${role}`);
    }
  }

  return (
    <div className="category-main">
      <div className="category">
        <div className="cat-head">
          <center><h2>SteadyDusk</h2></center>
          <div className="cat-sub-text">
            <h2>Sign Up for free</h2>
            <p>Choose which type of account you'd like to create:</p>
          </div>
        </div>

        <div className="box-cat">
          {[
            { role: "Teacher", subtext: "I'm offering classes or guidance." },
            { role: "Student", subtext: "I'm looking for classes or appointments." }
          ].map(({ role, subtext }) => (
            <button
              className="admin-box"
              key={role}
              onClick={() => handleclick(role)}
            >
              <p className="PHeader">{role}</p>
              <p className="Psubtext">{subtext}</p>
            </button>
          ))}
        </div>

        {!visible ||
          <div className="not-active">
            <button>Signup as a ...</button>
          </div>
        }

        <div className="sub-btn-reg">
          {!role || <div className="sub-btn-reg">
            <button onClick={handlenavigatefun}> SignUp as a {role}</button>
          </div>}
        </div>
      </div>
      <center>

        <hr />
      </center>
      <div className="foot-subtext">
        <p>Already have an account?</p>
        <p>Try<Link to="/login">logging in here </Link></p>
      </div>

    <div className="right-img">
      <img src="" alt="" />
    </div>
    </div>
  );
}

export default Category;
