import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./reducers/usersReducer"

export const store = configureStore({
  reducer: {
    auth: authReducer,
  }
})
