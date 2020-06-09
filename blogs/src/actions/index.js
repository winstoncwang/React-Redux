import _ from 'lodash';
import jsonPlaceholder from '../api/jasonPlaceholder';

export const fetchPosts = () => {
	//redux thunk returning a function with dispatch and getState argument
	//instead of return a plain object, we dispatch()
	return async (dispatch, getState) => {
		const response = await jsonPlaceholder.get('/posts');

		dispatch({
			type    : 'FETCH_POSTS',
			payload : response.data
		});
	};
};

//using lodash memorize and redux thunk
export const fetchUser = (id) => (dispatch, getState) => {
	_fetchUser(id, dispatch);
};

const _fetchUser = _.memoize(async (id, dispatch) => {
	const response = await jsonPlaceholder.get(`/users/${id}`);

	dispatch({ type: 'FETCH_USER', payload: response.data });
});
