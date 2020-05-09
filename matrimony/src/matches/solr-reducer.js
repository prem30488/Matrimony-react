const initialState = {
	query: {},
	result: {}
}

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_SOLR_STATE":
			console.log("In reducer: ", action.state);
			return {...state, ...action.state}
	}
}