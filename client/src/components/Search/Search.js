import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import SearchResultsContainer from "../SearchResultsContainer/SearchResultsContainer";
import Card from "../Card/Card";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProfileItem2 from "../profiles2/ProfileItem2";
import { getCurrentProfile} from '../../actions/profileActions'
import Profile from '../profile/Profile'

class Search extends Component {
  state = {
    search: "",
    users: [],
    results: [],
    profileInfo: {
      name: "",
      location: "",
      skills: [],
      instrument: ""
    }
  };

  componentDidMount() {
    this.props.getCurrentProfile();
    axios.get("api/profile/all").then(res => {
      let users = [];
      res.data.map(item => {
        users.push(item);
      });
      this.setState({
        users
      });
    });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClick = e => {
    let { users, search, results } = this.state;
  
    e.preventDefault();

    users.map((user, i) => {
      if (user.status.toLowerCase() == search.toLowerCase()) {
    let name, location, skills, instrument;

    name = user.user.name;
    location = user.location;
    skills = user.skills;
    instrument = user.status;

    console.log(name, location, skills, instrument);

    this.setState({
      profileInfo: {
        name,
        location,
        skills,
        instrument
      }
    });

    console.log(this.state.profileInfo)
        results.push(user);
      }
    });

    // this.setState({
    //   results: matches
    // });
    // e.preventDefault();
    const {profile} = this.props.profile;
    console.log(this.state.users);
    // console.log('user', user);
    // console.log('search', search);
    // console.log('results', results);
    // console.log(profile);

    

    // const matche= {
    //   instrument : user.status,
    // }
  };

  render() {
    // const { user } = this.props.auth;
    // const { profile } = this.props.profile;
    const {name, location, skills, instrument } = this.state.profileInfo;
    
    return (
      <div>
        <TextFieldGroup
          placeholder="Search for instrument(s)"
          name="search"
          value={this.state.search}
          onChange={this.onChange}
          info="Search for instrument(s)"
        />
        <button onClick={this.onClick}>Search</button>
        <SearchResultsContainer>
          {this.state.results.map((result, i) => {
            return <ProfileItem2 avatar={"avatar"} name={result.user.name} skills={result.skills} location={result.location} key={i}/>;
          })}
        </SearchResultsContainer>
      </div>
    );
  }
}

Search.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {getCurrentProfile})(Search);