import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value: false
}
 
export const toggleBSSlice = createSlice({
    name: 'toggleBS',
    initialState,
    reducers: {
        toggleBSState: (state = []) => {
          state.value = !state.value;
        }
    }
})

export const { toggleBSState } = toggleBSSlice.actions

export default toggleBSSlice.reducer