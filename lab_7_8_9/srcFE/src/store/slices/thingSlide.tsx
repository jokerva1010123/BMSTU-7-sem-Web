import { createSlice } from "@reduxjs/toolkit";

import ThingSetting from "../../utils/ThingSetting";
import { handleErrorResponse } from "../../utils";
import { AppThunk } from "../index";
const thingSetting = new ThingSetting();
import { Thing } from "../../interfaces/models/thing";
export interface thingState {
  listThing: Array<Thing> | null;
}

const initialState: thingState = {
  listThing: [],
};
export const thingSlide = createSlice({
  name: "Thing",
  initialState: initialState,
  reducers: {
    listThing: (state, action) => {
      state.listThing = action.payload;
      return state;
    },
  },
});

export const getlistThing = (): AppThunk => async (dispatch) => {
  try {
    const response = await thingSetting.listThing({}, {});
    dispatch(listThing(response.response));
  } catch (err) {
    handleErrorResponse(err);
  }
};

export const getThingId =
  (id: number, data: any): AppThunk =>
  async (dispatch) => {
    try {
      const response = await thingSetting.getThingId(id, data);
      if (response.status) {
        dispatch(getlistThing());
      }
    } catch (err) {
      handleErrorResponse(err);
    }
  };

export const changeThingRoom =
  (id: any, data: any, succes: (check: any) => void): AppThunk =>
  async (dispatch) => {
    try {
      console.log(data);
      const response = await thingSetting.changeThingRoom(id, data);
      if (response.status) {
        dispatch(getlistThing());
        succes(response.status);
      }
      else succes(response.status);
    } catch (err) {
      handleErrorResponse(err);
    }
  };
export const changeThingStudent =
  (id: any, data: any, succes: (check: any) => void): AppThunk =>
  async (dispatch) => {
    try {
      console.log(data);
      const response = await thingSetting.changeThingStudent(id, data);
      if (response.status) {
        dispatch(getlistThing());
        succes(response.status);
      }
      succes(response.status);
    } catch (err) {
      handleErrorResponse(err);
    }
  };
export const createThing =
  (data: any, succes: (check: any) => void): AppThunk =>
  async (dispatch) => {
    try {
      console.log(data);
      const response = await thingSetting.createThing(data);
      if (response.status) {
        dispatch(getlistThing());
        succes(response.status);
      }
    } catch (err) {
      handleErrorResponse(err);
    }
  };

export const { listThing } = thingSlide.actions;

const thingReducer = thingSlide.reducer;
export default thingReducer;
