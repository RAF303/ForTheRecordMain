import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Container from "../Card/Container";
import Axios from "axios";
import PostFeed from "../posts/PostFeed";
import { getPosts } from "../../actions/postActions";

class Dashboard extends Component {
  state = {
    users: [],
    posts: [],
    followers: []
  };
  componentDidMount() {
    this.props.getPosts();
    this.props.getCurrentProfile();
    Axios.get("api/profile/all").then(res => {
      let users = [];
      res.data.map(item => {
        users.push(item);
      });
      this.setState({
        users
      });
    });
    Axios.get("api/posts").then(res => {
      let posts = [];
      res.data.map(post => {
        post.likes.map(like => {
          const loggedIn = this.props.auth.user.id;

          if (like.user === loggedIn) {
            posts.push(post);
          }
        });
      });
      this.setState({
        posts
      });
    });
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    // const posts = this.props.post;
    // const users = this.state.users;

    let dashboardContent;
    // let postContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome 
               <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <p>
              Post you've liked
            </p>
            <div>
              <Container>
                <PostFeed posts={this.state.posts} />
              </Container>
            </div>
            <ProfileActions />
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // user is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted"> Welcome {user.name}</p>
            <p>You have not yet set up profile</p>
            <Link to="/create-profile" className="btn btn-lg brn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propsTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, getPosts }
)(Dashboard);
