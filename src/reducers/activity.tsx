import { Activity } from "../types"

export type ActivityPayload = {
    edit?: boolean 
    activity: Activity
}

export type ActivityActions =
    { type: 'save-activity', payload: ActivityPayload } |
    { type: 'delete-activity', payload: ActivityPayload } |
    { type: 'reset-activities' }

export type ActivityState = Activity[];

const initialState: ActivityState = [];

const reducer = (state: ActivityState = initialState, action: ActivityActions) => {
    const { type } = action;

    switch (type) {
        case 'save-activity':

            if (action.payload.edit) {
                return state.map(oldActivity => {
                    if (oldActivity.id === action.payload.activity.id) {
                        return action.payload.activity;
                    }

                    return oldActivity;
                });
            }
            
            return [
                ...state,
                action.payload.activity
            ];

        case 'delete-activity':
            return state.filter(oldActivity => oldActivity.id !== action.payload.activity.id);
        
        case 'reset-activities':
            return [];

        default:
            console.log('`Default` triggered');

            return state;
    }
}

export {
    reducer,
    initialState,
}