import { userService } from "../services/authentication.service";

export const fetchUsersSuccess = (users) => {
  return {
    type: 'FETCH_USERS_SUCCESS',
    users: users,
    receivedAt: Date.now
  }
}

export const fetchUsersFailed = (error) => {
  return {
    type:'FETCH_USERS_FAILED',
    error
  }
}

export const fetchUsersRequest = () => {
  return {
    type:'FETCH_USERS_REQUEST'
  }
}

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest());

    const response = await fetch( "/api/most-liked", {
        headers: {
            'Authorization': userService.getToken()
        }
    });

    if(response.ok){
        response.json().then(data => {
            data.sort(function(a, b){
                return b.likes - a.likes;
            });
            dispatch(fetchUsersSuccess(data));
        }).catch(err => dispatch(fetchUsersFailed(err)));
    }
    else{
        response.json().then(error => {
          dispatch(fetchUsersFailed(error));
        }).catch(err => dispatch(fetchUsersFailed(err)));
    }

    return response;
  }
}
