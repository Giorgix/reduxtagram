function postComments(state = [], action) {
	switch (action.type) {
		case 'ADD_COMMENT':
			//return existing state with new comment
			return [
				...state,
				{
					user: action.author,
					text: action.comment
				}
			];
		case 'REMOVE_COMMENT':
			// we need to return the new state without the deleted comment
			return [
				// from the start to the one we want to delete
				...state.slice(0, action.i),
				// after the deleted one to the end
				...state.slice(action.i + 1)
			];
		default:
			return state;
	}
	return state;
}

// We use reducer composition just to
// update the piece of state that we want
// https://redux.js.org/basics/reducers#splitting-reducers
function comments(state = [], action) {
	if (typeof action.postId !== 'undefined') {
		return {
			//take current state
			...state,
			// override this post with a new one
			[action.postId]: postComments(state[action.postId], action)
		};
	}
	return state;
}

export default comments;
