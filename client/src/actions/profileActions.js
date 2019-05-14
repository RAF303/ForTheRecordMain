import axios from "axios";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  FOLLOW_USER, 
  GET_FOLLOWERS, 
  UNFOLLOW_USER,
  ADD_FOLLOWER,
  CLEAR_ERRORS
} from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

//create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete account and profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? CAN NOT BE UNDONE")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

//Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// ***Code to add followers*** //

//ADD Follower to DB 
export const addFollower = followerData => dispatch => {
  dispatch(clearErrors());
  axios
      .post('/api/profile', followerData)
      .then(res => 
          
          dispatch({
              type: ADD_FOLLOWER,
              payload: res.data
          })
          
          
      )
      .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
      

    };

//GET Followers
export const getFollowers = () => dispatch => {
  axios
      .get('/api/profile/followers')
      .then(res => 
          dispatch({
              type: GET_FOLLOWERS,
              payload: res.data
          })
      )
      .catch(err =>
          dispatch({
            type: GET_FOLLOWERS,
            payload: null
          })
        );
    };

// Follow a user
export const follow= id => dispatch =>{
  axios
      .post(`/api/profile/followers`)
      .then(res=> 
          dispatch(getFollowers()))
       .catch(err =>
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
           })
       );
};

//Unfollow user
export const unFollow = id => dispatch => {
  axios
      .post(`/api/profile/unfollow/${id}`)
      .then(res => 
          dispatch(getFollowers()))
      .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    };

// Clear errors
export const clearErrors = () => {
  return {
      type: CLEAR_ERRORS
  }
}