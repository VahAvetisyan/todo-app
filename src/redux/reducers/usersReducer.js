import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
}

const userReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.user = payload
    },
  },
})


export default userReducer.reducer

export const { setUser } = userReducer.actions

export const selectLoggedInUser = (state) => state.auth.user
