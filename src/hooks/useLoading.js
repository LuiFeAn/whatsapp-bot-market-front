import { useState } from "react";


export default function useLoading(){

    const [ loading, setLoading ] = useState(true);

    return {
        loading,
        setLoading
    }

}