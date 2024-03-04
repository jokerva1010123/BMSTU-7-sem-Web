import { createSlice } from "@reduxjs/toolkit";
import { Admin } from "../../interfaces/models/admin";
import { AppThunk } from "..";
import AuthSettings from "../../utils/AuthSettings";
import { handleErrorResponse } from "../../utils";
export type AdminState = Admin | null;

const initialState: AdminState = null;
const authSettings = new AuthSettings();
export const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state = action.payload;

      return state;
    },
    logout: (state) => {
      state = null;

      return state;
    },
  },
});
export const changePass =
  (id: any, data: any, succes: (check: any) => void): AppThunk =>
  async (dispatch) => {
    try {
      const response = await authSettings.changePass(id, data);
      succes(response.status);
    } catch (err) {
      handleErrorResponse(err);
    }
  };
export const { login, logout } = adminSlice.actions;

export default adminSlice.reducer;
