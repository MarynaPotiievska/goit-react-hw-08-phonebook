export const selectFilter = state => state.filter.value;

export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = state => {
	const filter = selectFilter(state);
	const contacts = selectContacts(state);
    if (filter !== '') {
      const filteredArr = contacts.filter(({ name }) =>
        name.toLowerCase().includes(filter)
      );
      return filteredArr;
    } else {
      return contacts;
    }
  };
