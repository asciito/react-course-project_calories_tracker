export type Category = {
    id: number,
    name: 'Food' | 'Exercise'
}

export type Activity = {
    id: string,
    category: number
    name: string
    calories: number
}