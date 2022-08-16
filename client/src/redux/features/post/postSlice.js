import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
	posts: [],
	popularPosts: [],
	isLoading: false
}

export const createPost = createAsyncThunk(
	'post/createPost', async (params) => {
		try {
			const { data } = await axios.post('/posts', params)
			return data
		} catch (error) {
			console.log(error);
		}
	}
)
export const getAllPosts = createAsyncThunk(
	'post/getAllPosts', async () => {
		try {
			const { data } = await axios.get('posts')
			return data
		} catch (error) {
			console.log(error);
		}
	}
)
export const removePost = createAsyncThunk(
	'post/removePost', async (id) => {
		try {
			const { data } = await axios.delete('/posts/' + id, id)
			return data

		} catch (error) {
			console.log(error)
		}
	}
)


export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
	},
	extraReducers: {
		[createPost.pending]: (state) => {
			state.isLoading = true
		},
		[createPost.fulfilled]: (state, action) => {
			state.isLoading = false
			state.posts.push(action.payload)
		},
		[createPost.rejected]: (state, action) => {
			state.isLoading = false
		},

		[getAllPosts.pending]: (state) => {
			state.isLoading = true
		},
		[getAllPosts.fulfilled]: (state, action) => {
			state.isLoading = false
			state.posts = action.payload.posts
			state.popularPosts = action.payload.popularPosts
		},
		[getAllPosts.rejected]: (state, action) => {
			state.isLoading = false
		},
		// delete posts

		[removePost.pending]: (state) => {
			state.isLoading = true
		},
		[removePost.fulfilled]: (state, action) => {
			state.isLoading = false
			state.posts = state.posts.filter(post => post._id !== action.payload._id)
		},
		[removePost.rejected]: (state, action) => {
			state.isLoading = false
		}
	}
})


export default postSlice.reducer