import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContacts = createAsyncThunk('contacts/fetchAll',
	async (_, thunkAPI) => {
		try {
			const resp = await axios.get('/contacts');
			return resp.data;
		}
		catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	});

export const addContact = createAsyncThunk(
	'contacts/addContact', async (contact, thunkAPI) => {
		try {
			const resp = await axios.post('/contacts', {
				name: contact.name,
				phone: contact.number
			});			
			return resp.data
		}
		catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const deleteContact = createAsyncThunk(
	'contacts/deleteContact', async (contactId, thunkAPI) => {
		try {
			const resp = await axios.delete(`/contacts/${contactId}`);
			return resp.data;
		}
		catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);