// import {
//   createAsyncThunk,
//   createSlice,
//   createEntityAdapter,
// } from '@reduxjs/toolkit';
// import axios from 'axios';

// export interface IPalette {
//   mode: string;
//   text: Array<string>;
//   primary: Array<string>;
//   secondary: Array<string>;
//   common: Array<string>;
//   background: Array<string>;
//   custom: Array<string>;
// }

// const getColorTheme = createAsyncThunk('users/color', async () => {
//   const response = await axios.get(`http://localhost:3001`);
//   return response.data;
// });

// export const initialState = {
//   users: [],
// };

// const themeAdapter = createEntityAdapter<any>({
//   selectId: ({ _id }) => _id,
// });

// const themeColorSlice = createSlice({
//   name: 'themeColor',
//   initialState: themeAdapter.getInitialState({}),
//   extraReducers: (builder) => {
//     /*
//      * fetchUsers Cases
//      */

//     builder.addCase(getColorTheme.pending, (state: any) => {
//       state.loading = true;
//     });
//     builder.addCase(getColorTheme.fulfilled, (state: any, action) => {
//       state.loading = false;
//       state.users = action.payload;
//     });
//     builder.addCase(getColorTheme.rejected, (state: any) => {
//       state.loading = false;
//     });
//   },

//   reducers: {
//     setTheme: themeAdapter.setAll,
//   },
// });
// export const { setTheme } = themeColorSlice.actions;
// export default themeColorSlice.reducer;
// export { getColorTheme };

// // export const { setTheme } = themeColorSlice.actions;
// // export default themeColorSlice.reducer;
