import React from 'react';
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

const ProfileItem2 =(props) => {
  return (
    <div className="card card-body bg-light mb-3">
    <div className="row">
      <div className="col-2">
        <img src={props.avatar} alt="" className="rounded-circle" />
      </div>
      <div className="col-lg-6 col-md-4 col-8">
        <h3>{props.name}</h3>
        <p>
          {props.status}{" "}
          {isEmpty(props.company) ? null : (
            <span>at {props.company}</span>
          )}
        </p>
        <p>
          {isEmpty(props.location) ? null : (
            <span>{props.location}</span>
          )}
        </p>
        <Link to={`/profile/${props.handle}`} className="btn btn-info">
          View Profile
        </Link>
      </div>
      <div className="col-md-4 d-none d-md-block">
        <h4>Skill Set</h4>
        <ul className="list-group">
          {props.skills.slice(0, 4).map((skill, index) => (
            <li key={index} className="list-group-item">
              <i className="fa fa-check pr-1" />
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  )
}

export default ProfileItem2;

// change user to ehat you want and pass in as props 