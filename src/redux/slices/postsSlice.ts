import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {Post} from "../../../types";


export interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const API_URL = "http://localhost:5000/posts";

// Initial State
const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
};

// Fetch posts from the API
export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchPosts",
  async () => {
    const response = await axios.get<Post[]>(API_URL);
    return response.data;
  }
);

// Add a new post to the API
export const addPost = createAsyncThunk<Post, Omit<Post, "id">>(
  "posts/addPost",
  async (post) => {
    const response = await axios.post<Post>(API_URL, post);
    return response.data;
  }
);

// Update an existing post in the API
export const updatePost = createAsyncThunk<Post, Post>(
  "posts/updatePost",
  async (post) => {
    const response = await axios.put<Post>(`${API_URL}/${post.id}`, post);
    return response.data;
  }
);

// Delete a post from the API
export const deletePost = createAsyncThunk<number, number>(
  "posts/deletePost",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

// Slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      });
  },
});

export default postsSlice.reducer;
