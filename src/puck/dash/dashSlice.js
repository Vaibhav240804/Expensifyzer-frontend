import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    addExpense: true,
    log:false,
    edit:false,
}


export const dashSlice = createSlice({
    name: 'dash',
    initialState,
    reducers: {
        reset:(state)=>{
            state.addExpense = true
            state.log = false
            state.edit = false
        },
        openLog:(state)=>{
            state.log = true
            state.addExpense = false
            state.edit = false
        },
        openExpense:(state)=>{
            state.log = false
            state.addExpense = true
            state.edit = false
        },
        openEdit:(state)=>{
            state.log = false
            state.addExpense = false
            state.edit = true
        }
    },
})
export const {reset, openEdit, openExpense, openLog} = dashSlice.actions

export default dashSlice.reducer
