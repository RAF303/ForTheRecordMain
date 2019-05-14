import { FOLLOW_USER, GET_FOLLOWERS, UNFOLLOW_USER } from "../actions/types";

const initialState = {
    following: [],
    loading: false
};

export default function(state= initialState, action){
    switch(action.type){
        case GET_FOLLOWERS:
            return{
                ...state,
                following: action.payload,
                loading: false
            }
        case FOLLOW_USER:
            return{
                ...state,
                following: [action.payload, ...state.following]
            }
            case UNFOLLOW_USER:
            return {
          ...state,
          following: [action.payload, ...state.following]
        };
    }
}