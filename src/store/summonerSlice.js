import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    summonerName: ""
};

export const summonerSlice = createSlice({
  name: "summoner",
  initialState,
  reducers: {
    updateSummoner: (state,action) => {
      return {
        ...state,
        summonerName: action.payload,
      };
    },
  },
});

export const {updateSummoner} = summonerSlice.actions;
export default summonerSlice.reducer;