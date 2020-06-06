console.clear();

// action creators: peeople dropping off forms
const createPolicy = (name, amount) => {
	return {
		//action: form
		type    : 'CREATE_POLICY',
		payload : {
			name   : name,
			amount : amount
		}
	};
};

const deletePolicy = (name) => {
	return {
		type    : 'DELETE_POLICY',
		payload : {
			name : name
		}
	};
};

const createClaim = (name, amountOfMoneyToCollect) => {
	return {
		type    : 'CREATE_CLAIM',
		payload : {
			name                   : name,
			amountOfMoneyToCollect : amountOfMoneyToCollect
		}
	};
};

//different Reducers for different departments
//add default empty arr for the first call
const claimsHistory = (oldListOfClaims = [], action) => {
	if (action.type === 'CREATE_CLAIM') {
		//return a new array, using push modifies existing array
		return [ ...oldListOfClaims, action.payload ];
	}
	return oldListOfClaims;
};

const accounting = (bagOfMoney = 100, action) => {
	if (action.type === 'CREATE_CLAIM') {
		return bagOfMoney - action.payload.amountOfMoneyToCollect;
	} else if (action.type === 'CREATE_POLICY') {
		return bagOfMoney + action.payload.amount;
	}
	return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
	if (action.type === 'CREATE_POLICY') {
		return [ ...listOfPolicies, action.payload.name ];
	} else if (action.type === 'DELETE_POLICY') {
		return listOfPolicies.filter((name) => name !== action.payload.name);
	}
	return listOfPolicies;
};

const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
	accounting    : accounting,
	claimsHistory : claimsHistory,
	policies      : policies
});

const store = createStore(ourDepartments);

store.dispatch(createPolicy('Alex', 20));
store.dispatch(createPolicy('Jim', 60));
store.dispatch(createPolicy('Bob', 10));

store.dispatch(createClaim('Jim', 100));
store.dispatch(deletePolicy('Bob'));

console.log(store.getState());
