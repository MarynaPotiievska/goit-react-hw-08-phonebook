import { createSlice } from "@reduxjs/toolkit";

const filterInitialState = {value: ''};

const filterSlice = createSlice({
	name: "filter",
	initialState: filterInitialState,
	reducers: {
		changeFilter: {
			reducer(state, {payload}) {
				state.value = payload
			  },
		},
	}
});

export const filterReducer = filterSlice.reducer;
export const { changeFilter } = filterSlice.actions;

