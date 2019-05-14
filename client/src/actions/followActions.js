import axios from 'axios';

import{
    FOLLOW_USER, 
    GET_FOLLOWERS, 
    UNFOLLOW_USER,
    GET_ERRORS,
    ADD_FOLLOWER,
    CLEAR_ERRORS
}from './types'

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
        .get('/api/profile')
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
        .post(`/api/profile/follow/${id}`)
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