import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Role {
  id: number;
  name: string;
  description?: string;
}

interface RoleState {
  roles: Role[];
  loading: boolean;
  error: string | null;
}

const initialState: RoleState = {
  roles: [],
  loading: false,
  error: null,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    roleStart(state) {
      state.loading = true;
      state.error = null;
    },

    roleFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    createRoleSuccess(state, action: PayloadAction<Role>) {
      state.loading = false;
      state.roles.unshift(action.payload);
    },

    setRoles(state, action: PayloadAction<Role[]>) {
      state.roles = action.payload;
      state.loading = false;
    },
    updateRoleSuccess(state, action: PayloadAction<Role>) {
  state.loading = false;

  const index = state.roles.findIndex(
    (r) => r.id === action.payload.id
  );

  if (index !== -1) {
    state.roles[index] = action.payload;
  }
},
  },
});

export const {
  roleStart,
  roleFailure,
  createRoleSuccess,
  setRoles,
   updateRoleSuccess,
} = roleSlice.actions;

export default roleSlice.reducer;