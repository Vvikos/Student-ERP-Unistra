const INITIAL_STATE = {
	me: {},
	updateUserError: false,
	updateUserErrorMessage: {},
	updateUserSuccess: false,
	loading: false,
	profileDataError: false,
}

const forgotpasswordReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
	  case 'REINITIALIZE_STATE':
	  	return {...currentState, updateUserError: false, updateUserErrorMessage: {}, loading:false, updateUserSuccess:false};
	  case 'PROFILE_DATA_REQ_SUCCESS':
	  	return {...currentState, me:action.data};
	  case 'PROFILE_DATA_REQ_FAILURE':
		  return {...currentState, profileDataError: true};
	  case 'UPDATE_USER_FAILURE':
		  return {...currentState, updateUserError:true, updateUserErrorMessage:action.message, loading: false, updateUserSuccess:false};
	  case 'UPDATE_USER_SUCCESS':
		  return {...currentState, updateUserError:false, updateUserErrorMessage:{}, updateUserSuccess: true, loading: false};
	  default:
	       return currentState;
	}
}

export default forgotpasswordReducer;
