import { createContext, useState, useContext } from 'react'

const LoadingContext = createContext({})

export const LoadingProvider = ({ children })=>{

    const [isLoading, setIsLoading] = useState(false)

    const showLoading = () => setIsLoading(true)
    const stopLoading = () => setIsLoading(false)

    return (
        <LoadingContext.Provider value={ { isLoading, showLoading, stopLoading } }>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => useContext(LoadingContext)