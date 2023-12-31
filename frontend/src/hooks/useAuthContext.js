import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw Error('useWorkout context must be inside and AuthContext Provider')
    }

    return context;
}