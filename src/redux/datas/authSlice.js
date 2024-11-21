import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BASE_API_URL;

export const login = createAsyncThunk('auth/login', async (userModel) => {
  try {
    const response = await axios.post(`${apiUrl}Auth/login`, { ...userModel });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error.response.data);
  }
});

export const register = createAsyncThunk('auth/register', async (userModel) => {
  try {
    const response = await axios.post(`${apiUrl}Auth/Register`, { ...userModel });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return console.log(error.response.data);
  }
});

export const refleshToken = createAsyncThunk('auth/refleshtoken', async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${apiUrl}Auth/RefreshToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // Çerezlerin gönderilmesi için gerekli
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw new Error('Token yenileme başarısız oldu');
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') ?? '',
    expiration: localStorage.getItem('expiration') ?? '',
    loading: false,
    error: undefined,
  },
  reducers: {
    logout: (state) => {
      state.token = undefined; // Token'ı sıfırla
      localStorage.clear();
      state.error = undefined; // Hata mesajını sıfırla
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true; // Yükleniyor durumunu ayarla
        state.error = undefined; // Hata mesajını sıfırla
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false; // Yükleniyor durumunu kaldır
        localStorage.setItem('token', action.payload.accessToken.token); // Token'ı localStorage'a kaydet
        localStorage.setItem('expiration', action.payload.accessToken.expiration); // Expiration'ı localStorage'a kaydet
        state.token = action.payload.accessToken.token; // Gelen token'ı state'e yaz
        state.expiration = action.payload.accessToken.expiration;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false; // Yükleniyor durumunu kaldır
        state.error = action.payload; // Hata mesajını ayarla
      })
      .addCase(register.pending, (state) => {
        state.loading = true; // Yükleniyor durumunu ayarla
        state.error = undefined; // Hata mesajını sıfırla
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false; // Yükleniyor durumunu kaldır
        state.error = undefined; // Hata mesajını sıfırla
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false; // Yükleniyor durumunu kaldır
        state.error = action.payload; // Hata mesajını ayarla
      })
      .addCase(refleshToken.pending, (state) => {
        state.loading = true; // Yükleniyor durumunu ayarla
        state.error = undefined; // Hata mesajını sıfırla
      })
      .addCase(refleshToken.fulfilled, (state, action) => {
        state.loading = false; // Yükleniyor durumunu kaldır
        localStorage.setItem('token', action.payload.token); // Token'ı localStorage'a kaydet
        localStorage.setItem('expiration', action.payload.expiration); // Expiration'ı localStorage'a kaydet
        state.token = action.payload.token; // Gelen token'ı state'e yaz
        state.expiration = action.payload.expiration;
        state.error = undefined;
      })
      .addCase(refleshToken.rejected, (state, action) => {
        state.loading = false; // Yükleniyor durumunu kaldır
        state.error = action.payload; // Hata mesajını ayarla
      });
  },
});

// Export action ve selectorlar
export const { logout } = authSlice.actions;
export default authSlice.reducer;
