import { createSlice } from "@reduxjs/toolkit";

interface ModeState {
  mode: string;
}

const initialState: ModeState = {
  mode: "light",
};

export const modeSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;
