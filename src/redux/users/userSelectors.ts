import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectUsers = (state: RootState) => state.users.users;
export const selectFilteredUsers = (state: RootState) => state.users.searchTerm;
export const selectIsLoading = (state: RootState) => state.users.isLoading;
export const selectError = (state: RootState) => state.users.error;

export const filteredUsersSelector = createSelector(
  [selectUsers, selectFilteredUsers],
  (users, searchTerm) => {
    return users.filter(user =>
      Object.keys(searchTerm).every(key =>
        user[key as keyof typeof searchTerm]?.toString().toLowerCase().includes(searchTerm[key as keyof typeof searchTerm].toLowerCase().trim())
      )
    );
  }
);