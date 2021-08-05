import { types } from "../types/types";

//LOs reducer son funciones puras que no tienen interacciones del exterior
export const chatReducer = (state, action) => {

    switch (action.type) {
        case types.usuariosCargados: 
            return {
                ...state,
                users: [...action?.payload]
            }
        case types.activarChat: 
            return {
                ...state,
                chatActive: action.payload
            }
        default:
            return state;
    }
}