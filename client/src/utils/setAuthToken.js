import axios from 'axios'; 

const setAuthToken = token => {
    if(token) {
        //Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    }else{
        // delete Auth header
        delete axios.defaults.headers.common['Aithorization'];
    }
}

export default setAuthToken;