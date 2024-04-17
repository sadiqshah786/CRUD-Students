import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: { users: [] },
  reducers: {
    addUsers: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, student_name, student_class, student_section } =
        action.payload;
      const userIndex = state.users.findIndex((user) => user?.id == id);
      if (userIndex !== -1) {
        state.users[userIndex] = {
          ...state.users[userIndex],
          student_name,
          student_class,
          student_section,
        };
      }
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      const userIndex = state?.users?.findIndex((user) => user?.id === id);
      if (userIndex !== -1) {
        state?.users.splice(userIndex, 1);
      }
    },
  },
});

export const { addUsers, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
