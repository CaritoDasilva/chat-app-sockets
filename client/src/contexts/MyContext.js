import { createContext } from 'react';


export const MyContext = createContext();

export const MycontextProvider = ({ children }) => {

    const msg = "Holis Arnaldo"

    return (
        <MyContext.Provider value={{msg: msg}}>
            { children }
        </MyContext.Provider>
    )

}