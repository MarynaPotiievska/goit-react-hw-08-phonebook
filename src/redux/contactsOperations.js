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
				number: contact.number
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

export const editContact = createAsyncThunk(
	'contacts/editContact', async ({contactId, newData}, thunkAPI) => {
	  try {
		const resp = await axios.patch(`/contacts/${contactId}`, {
		  name: newData.name,
		  number: newData.number
		});
		return resp.data;
	  }
	  catch (error) {
		return thunkAPI.rejectWithValue(error.message);
	  }
	}
  )