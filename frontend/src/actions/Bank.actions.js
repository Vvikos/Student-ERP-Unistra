import {userService} from "../services/authentication.service";

const MONEY_API_URL = 'https://money.erp.uni.princelle.org';

export const transactionDataFetchSuccess = (data) => {
    return {
        type:'TRANS_DATA_REQ_SUCCESS',
        data
    }
}

export const transactionDataFetchFailure = (message) => {
    return {
        type:'TRANS_DATA_REQ_FAILURE',
        message
    }
}

export const profileDataFetchSuccess = (data) => {
    return {
        type:'PROFILE_DATA_REQ_SUCCESS',
        data
    }
}

export const profileDataFetchFailure = (message) => {
    return {
        type:'PROFILE_DATA_REQ_FAILURE',
        message
    }
}

export const fetchUserTransactions = (student_number) => {
    return async (dispatch) => {
        const response = await fetch(MONEY_API_URL+'/transactions/get/'+student_number, {
            method: 'GET'
        })

        if(response.ok){
            response.json().then(data => {
                console.log(data);
                let balance = data.rows.map(data => data.amount).reduce((sum, amount) => sum + amount);
                let data_sorted = data.rows.sort(function(a,b){return  Date.parse(b.concluded_at) - Date.parse(a.concluded_at)});
                dispatch(transactionDataFetchSuccess({balance: balance, transactions: data_sorted}));
            }).catch(err => dispatch(transactionDataFetchFailure(err)));
        }
        else{
            response.json().then(error => {
                dispatch(transactionDataFetchFailure(error));
            }).catch(err => dispatch(transactionDataFetchFailure(err)));
        }

        return response;
    }
}

export const fetchUserData = () => {
    return async (dispatch) => {
        const response = await fetch( "/api/me", {
            method: 'GET',
            headers: {
                'Authorization': userService.getToken()
            }
        });
        
        if(response.ok){
            response.json().then(data => {
                dispatch(profileDataFetchFailure(data));
            }).catch(err => dispatch(profileDataFetchFailure(err)));
        } else {
            response.json().then(error => {
                dispatch(profileDataFetchFailure(error));
            }).catch(err => dispatch(profileDataFetchFailure(err)));
        }

        return response;
    }
}

export const reinitializeState = () => {
    return {
        type:'REINITIALIZE_STATE'
    }
}
