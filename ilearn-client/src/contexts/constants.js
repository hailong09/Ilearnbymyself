
export const apiUrl =
process.env.NODE_ENV !== 'production'
    ? 'https://mysterious-lowlands-41648.herokuapp.com/api' : "https://mysterious-lowlands-41648.herokuapp.com/api"

export const LOCAL_STORAGE_TOKEN_NAME = 'learnint-mern'

export const POSTS_LOADED_FAILED = 'POSTS_LOADED_FAILED'

export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS"

export const ADD_POST = "ADD_POST"

export const  DEL_POST = " DEL_POST"

export const UPDATE_POST = "UPDATE_POST"

export const FIND_POST = "FIND_POST"

// http://localhost:5000/api