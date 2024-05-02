import { useMemo } from "react";
import { Activity } from "../types";

type CaloriesTrackerProps = {
    activities: Activity[]
}

export default function CaloriesTracker({ activities }: CaloriesTrackerProps) {
    const foodOnly = useMemo(() => activities.filter(({ category }) => category === 1), [activities]);
    const exerciseOnly = useMemo(() => activities.filter(({ category }) => category === 2), [activities]);

    const consumed = useMemo(() => foodOnly.reduce((total, activity) => total + activity.calories, 0), [foodOnly]);
    const burned = useMemo(() => exerciseOnly.reduce((total, activity) => total + activity.calories, 0), [exerciseOnly]);

    const netCalories = useMemo(() => consumed - burned, [consumed, burned]);

    return (
        <div>
            <h2 className="text-4xl font-black text-white text-center">Calories Resume</h2>

            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
                    <span className="font-black text-6xl text-orange">{ consumed }</span>
                    Consume
                </p>

                <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
                    <span className="font-black text-6xl text-orange">{ burned }</span>
                    Exercise
                </p>

                <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
                    <span className="font-black text-6xl text-orange">{ netCalories }</span>
                    Difference
                </p>
            </div>
        </div>
    );
}