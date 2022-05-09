import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchContacts, putContacts } from "../services/contactsAPI";

const initialState = {
  contacts: [],
  status: "idle",
  currentContact: null,
};

export const getContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const response = await fetchContacts();

    return response;
  }
);

export const updateContacts = createAsyncThunk(
  "contacts/updateContacts",
  async (contact) => {
    const response = await putContacts(contact);

    return response;
  }
);

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    findCurrentContact: (state, action) => {
      const currentContact = state.contacts.find(
        (contact) => contact?.id === action.payload
      );

      state.currentContact = currentContact;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.status = "idle";
        state.contacts = action.payload;
      })

      .addCase(updateContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateContacts.fulfilled, (state, action) => {
        state.status = "idle";
        const updatedContact = action.payload;

        state.contacts = state.contacts.map((contact) => {
          if (contact.id === updatedContact.id) {
            return updatedContact;
          }

          return contact;
        });
      });
  },
});

export const selectContacts = (state) => state.contacts;
export const { findCurrentContact } = contactsSlice.actions;

export default contactsSlice.reducer;
