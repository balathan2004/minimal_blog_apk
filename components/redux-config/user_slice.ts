import { createSlice } from "@reduxjs/toolkit";
import { DummyUserData } from "../interfaces";


export const InitialState = DummyUserData


const UserSlice = createSlice({
  name: "USERCRED",
  initialState: InitialState,
  reducers: {
    UserDataUpload: (state,action) => {
      console.log(action.payload)
      console.log("data uploaded")
        return { ...state, ...action.payload };
    },
   
  },
});

export const { UserDataUpload } =
  UserSlice.actions;

export default UserSlice.reducer;