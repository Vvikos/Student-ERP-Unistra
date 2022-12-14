import {userService} from "../services/authentication.service";

const INITIAL_STATE = {
	login: "Oh my god log me in to this great thingy",
	error: false,
	loading: false,
	errorMessage: {},
	loggedIn: false,
}

const loginReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
	case 'REINITIALIZE_STATE':
		return {...currentState, loading:false, error: false, errorMessage: {}};
	case 'LOGIN_REQUEST':
		return {...currentState, loading:true, error: false, errorMessage: {}, loggedIn: false};
	case 'LOGIN_FAILED':
		return {...currentState, loading:false, error: true, errorMessage: action.message, loggedIn:false};
	case 'LOGIN_SUCCESS_WAIT_PAYMENT':
		return {...currentState, loading:false, error: false, errorMessage: {}, loggedIn:true, adhesionPaid:false};
	case 'LOGIN_SUCCESS_PAYMENT_DONE':
		return {...currentState, loading:false, error: false, errorMessage: {}, loggedIn:true, adhesionPaid:true};
	case 'LOGOUT_SUCCESS':
		return {...currentState, loading:false, error: false, errorMessage: {}, loggedIn:false};
	case 'GET_AUTH':
		return {...currentState, loggedIn: userService.loggedIn(), adhesionPaid:userService.getAdhesion()}
	default:
	return currentState;
	}
}

export default loginReducer;
