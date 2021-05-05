import {createContext, useReducer, useState} from 'react';
import {PostReducer} from '../reducers/PostReducer'
import {apiUrl, POSTS_LOADED_FAILED, POSTS_LOADED_SUCCESS, ADD_POST, DEL_POST, UPDATE_POST, FIND_POST } from './constants'
import axios from 'axios';


export const PostContext = createContext();

const PostContextProvider = ({children}) => {
    //State
    const [postState, dispatch] = useReducer(PostReducer, {
        posts: [],
        postLoading: true,
        post: null,
    })

    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [showToast, setShowToast] = useState({
        show: false,
        message:'',
        type: null

    });



    //Get all posts
    const getPosts = async () => {
		try {
			const response = await axios.get(`${apiUrl}/posts`)
			if (response.data.success) {
				dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts })
			}
		} catch (error) {
			dispatch({ type: POSTS_LOADED_FAILED })
		}
	}
    // Add post
    const addPost  = async newPost  => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost)
            if(response.data.success){
                dispatch({
                    type: ADD_POST,
                    payload:  response.data.post
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'Server Error'}
        }
    }

    //Delete post 
    const deletePost = async postId => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`);
            if(response.data.success){
                dispatch({type: DEL_POST, payload: postId})
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    //Find post when user is updating post
    const findPost = postId => {
        const post = postState.posts.find(post => post._id === postId)
        dispatch(
            {
                type:FIND_POST,
                payload: post
            }
        )
    }
    // update post
    const updatePost = async updatedPost => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${updatedPost._id}`, updatedPost)
            if(response.data.success) {
                dispatch(
                    {
                        type: UPDATE_POST,
                        payload: response.data.post
                    }
                )
                return response.data
            }
        } catch (error) {
             return error.response.data 
                ? error.response.data 
                : {success:false, message: 'Server Error'}
            
        }
    }

    //post context data
    const postContextData = {
        postState, 
        getPosts, 
        showModal, 
        setShowModal, 
        addPost, 
        showToast, 
        setShowToast,
        deletePost,
        updatePost,
        findPost,
        showUpdateModal, 
        setShowUpdateModal
    };
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider