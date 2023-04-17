import { createContext, useContext, useReducer, } from "react";

import { reducer } from "./reducer";

let AppContext = createContext()
export let AppProvider = ({ children }) => {

    let [state, dispatch] = useReducer(reducer,
        {
            imag: [],
            storedImages: [],
            gridImages:[]

        })

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}


export let useGlobleData = () => {
    return useContext(AppContext)
}