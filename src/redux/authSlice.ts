// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
//   image?: string;
//   permissions: string[];
//   schoolId: number;
// }

// interface AuthState {
//   accessToken: string | null;
//   refreshToken: string | null;
//   user: User | null;
//   isAuthenticated: boolean;
//   loading: boolean;
// }

// const initialState: AuthState = {
//   accessToken: null,
//   refreshToken: null,
//   user: null,
//   isAuthenticated: false,
//   loading: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setAuthData: (
//       state,
//       action: PayloadAction<{
//         accessToken: string;
//         refreshToken?: string;
//         user: User;
//       }>
//     ) => {
//       state.accessToken = action.payload.accessToken;
//       state.refreshToken = action.payload.refreshToken || null;
//       state.user = action.payload.user;
//       state.isAuthenticated = true;
//     },

//     setUser: (state, action: PayloadAction<User>) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//     },

//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.loading = action.payload;
//     },

//     updatePermissions: (state, action: PayloadAction<string[]>) => {
//       if (state.user) {
//         state.user.permissions = action.payload;
//       }
//     },

//     logout: (state) => {
//       state.accessToken = null;
//       state.refreshToken = null;
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const {
//   setAuthData,
//   setUser,
//   setLoading,
//   updatePermissions,
//   logout,
// } = authSlice.actions;

// export default authSlice.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  name: string;
  email: string;
  // role: string;
  image?: string;
  permissions: string[];
  schoolId: number;
  schoolName?: string;
  roles: string[];
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}
// export interface User {
//   id: number;
//   schoolId: number;
  // schoolName?: string;
  // roles: string[];
//   permissions: string[];
// }
const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken?: string;
        user: User;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken || null;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    updatePermissions: (state, action: PayloadAction<string[]>) => {
      if (state.user) {
        state.user.permissions = action.payload;
      }
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false; // ✅ improvement
    },
  },
});

export const {
  setAuthData,
  setUser,
  setLoading,
  updatePermissions,
  logout,
} = authSlice.actions;

export default authSlice.reducer;