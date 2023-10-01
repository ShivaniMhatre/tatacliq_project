import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const initialState = { user: null };

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload
            }
        case "LOGOUT":
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}

const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const Login = (userData, token) => {
        localStorage.setItem('UserToken', JSON.stringify(token))
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    const Logout = () => {
        localStorage.removeItem('UserToken')
        dispatch({
            type: 'LOGOUT'
        })
    }

    useEffect(() => {
        async function getCureentUser() {
            const token = JSON.parse(localStorage.getItem('UserToken'))
            if (token) {
                const response = await axios.post('http://localhost:5006/getcurrentUser', { token })
                if (response.data.success) {
                    dispatch({
                        type: 'LOGIN',
                        payload: response.data.userData
                    })
                } else {
                    dispatch({
                        type: 'LOGOUT'
                    })
                }
            }
        } getCureentUser()
    }, [])
    return (
        <AuthContext.Provider value={{ state, Login, Logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider