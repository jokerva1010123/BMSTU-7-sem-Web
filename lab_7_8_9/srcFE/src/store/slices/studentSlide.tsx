import { createSlice } from "@reduxjs/toolkit";

import StudentSetting from "../../utils/StudentSetting";
import { handleErrorResponse } from "../../utils";
import { AppThunk } from "../index";
const studentSetting = new StudentSetting();
import { Student } from "../../interfaces/models/student";
export interface studentState {
  listStudent: Array<Student> | null;
}

const initialState: studentState = {
  listStudent: [],
};
export const studentSlide = createSlice({
  name: "Student",
  initialState: initialState,
  reducers: {
    listStudent: (state, action) => {
      state.listStudent = action.payload;
      return state;
    },
  },
});

export const getlistStudent = (): AppThunk => async (dispatch) => {
  try {
    const response = await studentSetting.listStudents();
    dispatch(listStudent(response.response));
  } catch (err) {
    handleErrorResponse(err);
  }
};

export const createStudent =
  (data: any, succes: (check: any) => void): AppThunk =>
  async (dispatch) => {
    try {
      console.log(data);
      const response = await studentSetting.createStudents(data);
      if (response.status) {
        dispatch(getlistStudent());
        succes(response.status);
      }
    } catch (err) {
      handleErrorResponse(err);
    }
  };
export const changeStudentGroup =
  (id: any, data: any, succes: (check: any) => void): AppThunk =>
  async (dispatch) => {
    try {
      console.log(data);
      const response = await studentSetting.changeStudentGroup(id, data);
      if (response.status) {
        dispatch(getlistStudent());
        succes(response.status);
      }
      else succes(response.status);
    } catch (err) {
      handleErrorResponse(err);
    }
  };
export const changeStudentRoom =
  (id: any, data: any, succes: (check: any) => void): AppThunk =>
  async (dispatch) => {
    try {
      console.log(data);
      const response = await studentSetting.changeStudentRoom(id, data);
      if (response.status) {
        dispatch(getlistStudent());
        succes(response.status);
      }
      else succes(response.status);
    } catch (err) {
      handleErrorResponse(err);
    }
  };

  export const getStudentId =
  (id: any): AppThunk =>
  async (dispatch) => {
    try {
      const response = await studentSetting.getStudentId(id);
      if (response.status) {
        console.log(response);
        let data = [];
        data.push(response.response);
        dispatch(listStudent(data));
      }
    } catch (err) {
      handleErrorResponse(err);
    }
  };
export const { listStudent } = studentSlide.actions;

const studentReducer = studentSlide.reducer;
export default studentReducer;
