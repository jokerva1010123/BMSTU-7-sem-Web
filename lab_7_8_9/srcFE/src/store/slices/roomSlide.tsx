import { createSlice } from "@reduxjs/toolkit";

import RoomSetting from "../../utils/RoomSetting";
import { handleErrorResponse } from "../../utils";
import { AppThunk } from "../index";
const roomSetting = new RoomSetting();
import { Room } from "../../interfaces/models/room";
export interface roomState {
  listRoom: Array<Room> | null;
}

const initialState: roomState = {
  listRoom: [],
};
export const RoomSlide = createSlice({
  name: "Room",
  initialState: initialState,
  reducers: {
    listRoom: (state, action) => {
      state.listRoom = action.payload;
      return state;
    },
  },
});

export const getlistRoom = (): AppThunk => async (dispatch) => {
  try {
    const response = await roomSetting.getListRom();
    dispatch(listRoom(response.response));
  } catch (err) {
    handleErrorResponse(err);
  }
};

export const getRoomId =
  (id: number, data: any): AppThunk =>
  async (dispatch) => {
    try {
      const response = await roomSetting.getRoomId(id, data);
      if (response.status) {
        dispatch(getlistRoom());
      }
    } catch (err) {
      handleErrorResponse(err);
    }
  };
// export const createRoom =
//   (data: any, succes: (check: any) => void): AppThunk =>
//   async (dispatch) => {
//     try {
//       console.log(data);
//       const response = await RoomSetting.createRooms(data);
//       if (response.status) {
//         dispatch(getlistRoom());
//         succes(response.status);
//       }
//     } catch (err) {
//       handleErrorResponse(err);
//     }
//   };

export const { listRoom } = RoomSlide.actions;

const RoomReducer = RoomSlide.reducer;
export default RoomReducer;
