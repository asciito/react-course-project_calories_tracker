import { categories } from "../data/categories";
import { Activity } from "../types";
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';

type ActivityListProps = {
    activities: Activity[]
    onEditActivity: (activity: Activity) => void
    onDeleteActivity: (activity: Activity) => void
}

export default function ActivityList({ activities, onEditActivity, onDeleteActivity }: ActivityListProps) {
    const getCategoryName = (id: number): string => {
        return categories.find(category => category.id === id)!.name;
    }

    return (
        <>
            <h2 className="text-2xl font-bold text-slate-600 text-center">Food and Activities</h2>
            
            {
                activities.length < 1
                ? <p className="text-center my-5">There's no activities yet</p>
                : activities.map(activity => (
                    <div key={ activity.id } className="px-4 py-10 bg-white mt-5 flex justify-between">
                        <div className="space-y-2 relative">
                            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 2 ? 'bg-orange-500' : 'bg-lime-500'}`}>
                                { getCategoryName(activity.category) }
                            </p>
                            <p className="text-2xl font-bold pt-5">{ activity.name }</p>
                            <p className="font-black text-4xl text-lime-500">
                                { activity.calories } {''}
                                <span>Calorie{ activity.calories > 2 ? 's' : '' }</span>
                            </p>
                        </div>

                        <div className="flex gap-2 items-center">
                            <button onClick={ () => onEditActivity(activity) }>
                                <PencilSquareIcon className="w-8 h8 text-gray-800"/>
                            </button>

                            <button onClick={ () => onDeleteActivity(activity) }>
                                <XCircleIcon className="w-8 h8 text-red-500"/>
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}