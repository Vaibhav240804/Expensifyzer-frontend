import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {register,login, withGoogle} from './authService'
// get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user: null,
    isError: false,
    isSuccess: user ? true : false,
    isLoading: false,
    message:'',
}

// register user
export const registerUser = createAsyncThunk('auth/register', async (user, thunkAPI)=>{
    try {
        return await register(user);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.toString() || error.message
        return thunkAPI.rejectWithValue({message})
    }
})

export const withGoogleRed = createAsyncThunk('auth/withGoogle', async (thunkAPI)=>{
    try {
        return await withGoogle();
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.toString() || error.message
        return thunkAPI.rejectWithValue({message})
    }
})

export const loginUser = createAsyncThunk('auth/login', async (user, thunkAPI)=>{
    try {
        return await login(user);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.toString() || error.message
        return thunkAPI.rejectWithValue({message})
    }
})
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAll: (state)=>initialState,
        reset:(state)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(registerUser.pending, (state, action)=>{
            state.isLoading = true
        })
        builder.addCase(registerUser.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            console.log(state.user);
        })
        builder.addCase(registerUser.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload.message
            state.user = null
        })

        builder.addCase(loginUser.pending, (state, action)=>{
            state.isLoading = true
        })
        builder.addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(loginUser.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload.message
            state.user = null
        })
    }
})
export const {reset, resetAll} = authSlice.actions

export default authSlice.reducer
