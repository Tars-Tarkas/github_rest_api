import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const url = process.env.REACT_APP_BASE_URL;
const token = process.env.REACT_APP_TOKEN;

export const fetchApi = createAsyncThunk(
  "GitHubApi/fetchApi",
  async function (search: string, { rejectWithValue }) {
    try {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Server Error!");
      }
      const data = await res.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
const initialState = {
  data: [],
  loading: false,
  error: "",
};

const githubSlice = createSlice({
  name: "githubapi",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchApi.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchApi.fulfilled, (state, action) => {
      state.data = action.payload;
      //   state.loading = false;
    });
    builder.addCase(fetchApi.rejected, (state, action) => {
      //   state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default githubSlice.reducer;
