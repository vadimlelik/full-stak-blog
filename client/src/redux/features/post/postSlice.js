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
		}
	}
})


export default postSlice.reducer