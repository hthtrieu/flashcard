import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isTest: false,
  message: "",
}

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    _testAction: (state) => {
      state.isTest = false
    },
    _testActionSuccess: (state, { payload }) => {
      state.isTest = true;
      state.message = String(payload.message);
    }
  },

})

export const { _testAction, _testActionSuccess } = testSlice.actions

export default testSlice.reducer