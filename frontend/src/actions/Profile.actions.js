import {userService} from "../services/authentication.service";

export const profileDataFetchSuccess = (data) => {
    return {
        type:'PROFILE_DATA_REQ_SUCCESS',
        data
    }
}

export const profileDataFetchFailure = () => {
    return {
        type:'PROFILE_DATA_REQ_FAILURE'
    }
}

export const updateUserSuccess = () => {
    return {
        type:'UPDATE_USER_SUCCESS',
    }
}

export const updateUserFailure = (error) => {
    return {
        type:'UPDATE_USER_FAILURE',
        message:error,
    }
}

export const fetchUserData = () => {
    return async (dispatch) => {
        const response = await fetch( "/api/me", {
            method: 'GET',
            headers: {
                'Authorization': userService.getToken()
            }
        })

        if(response.ok){
            response.json().then(data => {
                dispatch(profileDataFetchSuccess(data));
            }).catch(err => dispatch(profileDataFetchFailure(err)));
        }
        else{
            response.json().then(error => {
                dispatch(profileDataFetchFailure(error));
            }).catch(err => dispatch(profileDataFetchFailure(err)));
        }

        return response;
    }
}

export const changeUserData = (data) => {
    return async (dispatch) => {
        const response = await fetch( "/api/me/update", {
            method: 'POST',
            headers: {
                'Authorization': userService.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })

        if(response.ok){
            dispatch(updateUserSuccess());
        }
        else{
            response.json().then(error => {
                dispatch(updateUserFailure(error));
            }).catch(err => dispatch(updateUserFailure(err)));
        }

        return response;
    }
}

export const reinitializeState = () => {
    return {
        type:'REINITIALIZE_STATE'
    }
}
