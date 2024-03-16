import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  message: "",
  token: localStorage.getItem("access_token") || "",
  refresh_token: localStorage.getItem("refresh_token") || "",
  profile: {}
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state, { payload }) => {
      state.isLoading = true;
    },
    loginActionSuccess: (state, { payload }) => {
      state.isLoading = false;
      localStorage.setItem("access_token", String(payload.data.access_token));
      localStorage.setItem("refresh_token", String(payload.data.refresh_token));
      state.token = String(payload.data.access_token);
      state.refresh_token = String(payload.data.refresh_token);
    },
    getProfileAction: (state, { payload }) => {
      state.isLoading = true;
    },
    getProfileActionSuccess: (state, { payload }) => {
      console.log("payload in slice: ", payload.data)
      state.isLoading = false;
      state.profile = payload.data;
    },
    getAccessTokenByRefreshTokenAction: (state, { payload }) => {
      state.isLoading = true;

    },
    getAccessTokenByRefreshTokenActionSuccess: (state, { payload }) => {
    },
  },

})

export const {
  loginAction,
  loginActionSuccess,
  getProfileAction,
  getProfileActionSuccess,
  getAccessTokenByRefreshTokenAction,
  getAccessTokenByRefreshTokenActionSuccess
} = authSlice.actions

export default authSlice.reducer