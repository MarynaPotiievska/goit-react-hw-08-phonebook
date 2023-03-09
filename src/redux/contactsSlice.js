import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./contactsOperations";

const contactsInitialState = {
	items: [],
    isLoading: false,
    error: null
};

const extraActions = [addContact, deleteContact, fetchContacts];
const getActions = (type) => extraActions.map(action => action[type])


const contactsSlice = createSlice({
	name: "contacts",
	initialState: contactsInitialState,
	extraReducers: (builder) => {
		return builder.addCase(fetchContacts.fulfilled, (state, {payload}) => {
			state.items = payload
		}).addCase(addContact.fulfilled, (state, { payload }) => {
			state.items.push(payload);
		}).addCase(deleteContact.fulfilled, (state, { payload }) => {
			const newItems = state.items.filter(item => {
				return item.id !== payload.id
			});
			state.items = newItems;
		}).addMatcher(isAnyOf(...getActions('pending'), state => {
			state.isLoading = true
		})).addMatcher(isAnyOf(...getActions('rejected')), (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		}).addMatcher(isAnyOf(...getActions('fulfilled')), state => {
			state.isLoading = false;
			state.error = null;
		})
	}	
});

export const contactsReducer = contactsSlice.reducer;

