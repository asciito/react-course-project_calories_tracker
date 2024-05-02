import { useEffect, useMemo, useReducer, useState } from "react";
import Form from "./components/Form";
import { reducer, initialState } from './reducers/activity';
import ActivityList from "./components/ActivityList";
import { Activity } from "./types";
import CaloriesTracker from "./components/CaloriesTracker";

const loadInitialState = () : Activity[] => {
    let activities: string | null;

    if (activities = localStorage.getItem('activities')) {
        return JSON.parse(activities);
    }
    
    return initialState;
}

export default function App() {
    const [activityToEdit, setActivityToEdit] = useState<Activity|null>(null);
    const [state, dispatch] = useReducer(reducer, loadInitialState());

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(state));
    }, [state]);

    useEffect(() => {
        setActivityToEdit(null);
    }, [state]);

    const canBeRestart = useMemo(() => state.length > 0, [state]);

    const handleOnDeleteActivity = (activity: Activity) => {
        if (activityToEdit) {
            setActivityToEdit(null);
        }

        dispatch({ type: 'delete-activity', payload: { activity }});
    }

    return (
        <>
            <header className="bg-lime-600 py-3">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <h1 className="text-center text-lg font-bold text-white uppercase">Calories Tracker</h1>

                    <button
                        className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded text-sm"
                        onClick={ () => canBeRestart && dispatch({ type: 'reset-activities' })}
                    >Reiniciar App</button>
                </div>
            </header>

            <section className="bg-lime-500 py-20 px-5">
                <div className="max-w-4xl mx-auto">
                    <Form dispatch={ dispatch } editActivity={ activityToEdit }/>
                </div>
            </section>

            <section className="bg-gray-800 py-10">
                <div className="max-w-4xl mx-auto">
                    <CaloriesTracker activities={ state }/>
                </div>
            </section>

            <section className="p-10 mx-auto max-w-4xl">
                <ActivityList
                    activities={ state }
                    onEditActivity={ activity => setActivityToEdit(activity) }
                    onDeleteActivity={ handleOnDeleteActivity }
                    />
            </section>
        </>
    );
}