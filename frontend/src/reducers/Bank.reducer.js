const INITIAL_STATE = {
	account: {balance: 0, transactions: []},
	fetchBankError: false,
	fetchBankErrorMessage: {},
	loading: false
}

const bankReducer = (currentState = INITIAL_STATE, action) => {
	console.log('BANK REDUCER', action);
  switch (action.type) {
	  case 'REINITIALIZE_STATE':
	  	return {...currentState, fetchBankError: false, fetchBankErrorMessage: {}, loading:false};
	  case 'TRANS_DATA_REQ_FAILURE':
		  return {...currentState, fetchBankError:true, fetchBankErrorMessage:action.message, loading: false};
	  case 'TRANS_DATA_REQ_SUCCESS':
		  return {...currentState, account:action.data, fetchBankError:false, fetchBankErrorMessage:{}, loading: false};
	  default:
	       return currentState;
	}
}

export default bankReducer;
