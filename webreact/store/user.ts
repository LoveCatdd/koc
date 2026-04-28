import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { login as apiLogin, getUserInfo, register as apiRegister } from '@/services/api';

export interface UserState {
  id: number;
  username: string;
  photo: string;
  token: string;
  is_login: boolean;
  pulling_info: boolean;
  rating: number;
  designation: string;
}

const initialState: UserState = {
  id: 0,
  username: '',
  photo: '',
  token: '',
  is_login: false,
  pulling_info: true,
  rating: 0,
  designation: '暂无称号',
};

export const login = createAsyncThunk(
  'user/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiLogin(credentials.username, credentials.password);
      return response.token;
    } catch (error) {
      return rejectWithValue('登录失败');
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiRegister(credentials.username, credentials.password);
      return response.message;
    } catch (error) {
      return rejectWithValue('注册失败');
    }
  }
);

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await getUserInfo(token);
      return response;
    } catch (error) {
      return rejectWithValue('获取用户信息失败');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload);
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.id = 0;
      state.username = '';
      state.photo = '';
      state.token = '';
      state.is_login = false;
      state.rating = 0;
      state.designation = '暂无称号';
    },
    updatePullingInfo: (state, action: PayloadAction<boolean>) => {
      state.pulling_info = action.payload;
    },
    updateUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    updatePhoto: (state, action: PayloadAction<string>) => {
      state.photo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.photo = action.payload.photo;
        state.rating = action.payload.rating;
        state.is_login = true;
        state.pulling_info = false;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.pulling_info = false;
      });
  },
});

export const {
  updateUser,
  updateToken,
  logout,
  updatePullingInfo,
  updateUsername,
  updatePhoto,
} = userSlice.actions;

export default userSlice.reducer;
