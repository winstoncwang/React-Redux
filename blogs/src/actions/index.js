import jsonPlaceholder from '../api/jasonPlaceholder';

export const fetchPosts = () => {
	//redux thunk returning a function with dispatch and getState argument
	//instead of return a plain object, we dispatch()
	return async (dispatch, getState) => {
		const response = await jsonPlaceholder.get('/posts');

		dispatch({
			type    : 'FETCH_POSTS',
			payload : response
		});
	};
};
