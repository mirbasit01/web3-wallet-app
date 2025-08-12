import React, { createContext } from 'react'

export const DetailsContex = createContext()


const DetailsProvider = ({ children }) => {
    return <DetailsContex.Provider
        value={{ text: 'Hello from DetailsContex' }}

    >
        {children}
    </DetailsContex.Provider>
}

export default DetailsProvider