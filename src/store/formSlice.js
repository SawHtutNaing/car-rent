import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchObj: {
        location: "Yangon",
        price_per_hour: 30
    }
};

export const formSlice = createSlice({
    name: "formSlice",
    initialState,
    reducers: {
        changeSearchOjb: (state, action) => {
            state.searchObj = action.payload;
        }
    }
})

export const { changeSearchOjb } = formSlice.actions
export default formSlice.reducer;