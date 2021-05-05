import {POSTS_LOADED_FAILED, POSTS_LOADED_SUCCESS, ADD_POST, DEL_POST, UPDATE_POST, FIND_POST} from '../contexts/constants'
export const PostReducer = (state, action) => {
    const {type, payload} = action
    switch(type) {
        case POSTS_LOADED_FAILED:
            return {
                ...state,
                posts: [],
                postLoading: false
            }

        case POSTS_LOADED_SUCCESS:
            return {
                ...state,
                posts: payload,
                postLoading: false
            }
        case ADD_POST:
            return{
                ...state,
                posts: [...state.posts, payload]
            }
        case DEL_POST:
            
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload)
            }
        case UPDATE_POST:
            const newPosts = state.posts.map(p => p._id === payload._id ? payload : p);
            return {
                ...state,
                posts: newPosts
            }
        case FIND_POST:
            return {
                ...state,
                post: payload
            }
        default:
            return state;
    }
}