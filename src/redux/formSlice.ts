import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userFormProps } from '@/types/form'

const loadFromLocalStorage = (): userFormProps[] => {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem('UserData')
        if (data) return JSON.parse(data)
    }
    return []
}

const initialState: userFormProps[] = loadFromLocalStorage()

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        addForm: (state, action: PayloadAction<userFormProps>) => {
            state.push(action.payload)
            localStorage.setItem('UserData', JSON.stringify(state))
        },
        updateForm: (
            state,
            action: PayloadAction<{ index: number; updated: Partial<userFormProps> }>
        ) => {
            state[action.payload.index] = {
                ...state[action.payload.index],
                ...action.payload.updated,
            }
            localStorage.setItem('UserData', JSON.stringify(state))
        },
        deleteForm: (state, action: PayloadAction<number>) => {
            state.splice(action.payload, 1)
            localStorage.setItem('UserData', JSON.stringify(state))
        },

    },
})

export const { addForm, updateForm, deleteForm } = formSlice.actions
export default formSlice.reducer
