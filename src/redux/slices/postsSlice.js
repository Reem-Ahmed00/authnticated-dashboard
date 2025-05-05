import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/posts";

// Fetch posts from the API
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Add a new post to the API
export const addPost = createAsyncThunk("posts/addPost", async (post) => {
  const response = await axios.post(API_URL, post);
  return response.data;
});

// Update an existing post in the API
export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
  const response = await axios.put(`${API_URL}/${post.id}`, post);
  return response.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      });
  },
});

export default postsSlice.reducer;