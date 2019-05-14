import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../common/Spinner";
import { getProfileByHandle } from "../../actions/profileActions";
import { getFollowers } from '../../actions/followActions';

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  followUser = e => {
    e.preventDefault();
    const profileID = this.props.profile.profile.user._id;
    const userID = this.props.user.user.id;
    const profileFollowers = this.props.profile.profile.followers;

    // Add profile to user's following array
    if (profileFollowers.includes(userID) === false) {
      profileFollowers.push(userID);
      console.log("user added to profile followers array:", profileFollowers);
    }

    const followerData = {
      profileID,
      profileFollowers,
      userID
    };

    this.props.getFollowers(profileID);
  };

  unfollowUser = e => {
    e.preventDefault();
    const profileID = this.props.profile.profile.user._id;
    const userID = this.props.user.user.id;
    const profileFollowers = this.props.profile.profile.followers;

    // Remove profile from user's following array
    for (var i = 0; i < profileFollowers.length; i++) {
      if (profileFollowers[i] === userID) {
        profileFollowers.splice(i, 1);
        console.log("user unfollowed.", profileFollowers);
      }
    }
  };

  render() {
    const { profile, loading } = this.props.profile;
    console.log("profile props :", this.props);
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else if (
      this.props.profile.profile.followers.indexOf(this.props.user.user._id) ===
      true
    ) {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
              <button
                onClick={this.unfollowUser}
                className="btn btn-light mb-3 float-left"
              >
                Unfollow
              </button>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
        </div>
      );
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
              <button
                onClick={this.followUser}
                className="btn btn-light mb-3 float-left"
              >
                Follow
              </button>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  getFollowers: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileByHandle, getFollowers }
)(Profile);
