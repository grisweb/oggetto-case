import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LayoutSlice {
  sidebarOpened: boolean;
}

const initialState: LayoutSlice = {
  sidebarOpened: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpened = !state.sidebarOpened;
    },
    setSidebarOpened: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpened = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpened } = layoutSlice.actions;

export default layoutSlice.reducer;
