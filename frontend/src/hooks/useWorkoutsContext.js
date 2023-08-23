import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutContext = () =>{
    const context = useContext(WorkoutsContext);

    if(context){
        return context;
    } else {
        throw new Error('useWorkoutContext must be used within a WorkoutContextProvider');
    }

}