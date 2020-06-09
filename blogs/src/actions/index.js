import _ from 'lodash';
import jsonPlaceholder from '../apis/jasonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
	await dispatch(fetchPosts());
	//unique id
	const userIds = new Set(_.map(getState().posts, 'userId'));
	console.log(userIds);
	//since there is nothing running after userId.forEach, await is not needed
	userIds.forEach((id) => dispatch(fetchUser(id)));
};

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
//chained return syntax
export const fetchUser = (id) => async (dispatch, getState) => {
	const response = await jsonPlaceholder.get(`/users/${id}`);

	dispatch({ type: 'FETCH_USER', payload: response.data });
};

//memoize version
// export const fetchUser = (id) => (dispatch, getState) => {
// 	_fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async (id, dispatch) => {
// 	const response = await jsonPlaceholder.get(`/users/${id}`);

// 	dispatch({ type: 'FETCH_USER', payload: response.data });
// });
