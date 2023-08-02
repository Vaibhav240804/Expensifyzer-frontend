import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/expenses`

const updateExpense = async (expenseData, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(`${API_URL}/${expenseData.id}`, expenseData, config)
    return response.data
}

const createExpense = async (expenseData, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, expenseData, config)
    return response.data
}

const deleteExpense = async (id, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(`${API_URL}/${id}`, config)
    return response.data
}

const getExpenses = async (token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL ,config)
    return response.data
}

const expenseService = {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense
}

export default expenseService