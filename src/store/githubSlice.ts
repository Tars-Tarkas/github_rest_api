import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = process.env.REACT_APP_BASE_URL;
const token = process.env.REACT_APP_PERSONAL_TOKEN;

export const fetchApi = createAsyncThunk(
  "GitHubApi/fetchApi",
  async function (
    {
      query,
      page,
      per_page,
    }: { query: string; page: number; per_page: number },
    { rejectWithValue }
  ) {
    try {
      const res = await fetch(
        `${url}search/repositories?q=${query}&page=${page}&per_page=${per_page}`,
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
  data: {},
  isLoading: false,
  error: "",
};

const githubSlice = createSlice({
  name: "githubapi",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchApi.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(fetchApi.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchApi.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default githubSlice.reducer;
