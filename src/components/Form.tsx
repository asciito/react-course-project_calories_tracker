import { useState, useEffect, FormEvent, Dispatch } from "react";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions } from "../reducers/activity";
import { v4 as uuid } from 'uuid';

type FormProps = {
    dispatch: Dispatch<ActivityActions>
    editActivity: Activity | null
}

const initialState: Activity = {
    id: uuid(),
    name: '',
    category: 1,
    calories: 0,
};

export default function Form({ dispatch, editActivity = null }: FormProps) {
    const [activity, setActivity] = useState<Activity>(initialState);

    const [valid, setValid] = useState(false);
    
    useEffect(() => {
        setValid(isValidActivity());
    }, [activity]);

    useEffect(() => {
        setActivity(editActivity || initialState);
    }, [editActivity]);

    const handleChange = (key: string, value: string) => setActivity({...activity, [key]: key == 'name' ? value : +value });

    const isValidActivity = (): boolean => {
        const { name, category, calories } = activity;

        return !! (name && category && calories);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch({ type: 'save-activity', payload: { activity, edit: !! editActivity }});

        setActivity({
            ...initialState,
            id: uuid(),
        });
    }

    return (
        <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={ handleSubmit }>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Category</label>

                <select
                    id="category"
                    name="category"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={ activity.category }
                    onChange={ ({ target }) => handleChange(target.name, target.value) }
                    >
                        {
                            categories.map(category => <option key={ category.id } value={ category.id }>{ category.name }</option>)
                        }
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Activity</label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    className="border border-slate-300 px-3 py-2 rounded-lg"
                    placeholder="e.g. Food, Orange juice, Tacos, Salad, Exercise, etc."
                    value={ activity.name }
                    onChange={ ({ target }) => handleChange(target.name, target.value) }
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calories</label>

                <input
                    id="calories"
                    name="calories"
                    type="number"
                    min="0"
                    className="border border-slate-300 px-3 py-2 rounded-lg"
                    placeholder="e.g. 100, 300, 500, etc"
                    value={ activity.calories }
                    onChange={ ({ target }) => handleChange(target.name, target.value) }
                />
            </div>

            <button
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 disabled:opacity-10 disabled:cursor-not-allowed w-full p-2 font-bold uppercase text-white cursor-pointer"
                disabled={ !valid }
                >Save { activity.category === 1 ? 'Food' : 'Exercise' }</button>
        </form>
    );
}