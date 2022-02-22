import { CategoriesArr } from "../../Config";

export interface Filter {
    name: string
    categories: string[]
    language: string
    location: string[]
    range: number[]
    payment: string
    search: string
    token: string
    nof: number[]
    engagementRate: number[]
    platforms: string[]
}

export const INITIAL_FILTERS = {
    name: '',
    categories: [], language: '',
    location: [], range: [1000, 50000],
    payment: '', search: '',
    token: '', nof: [1000, 100000],
    engagementRate: [0.5, 4.5],
    platforms: []
}

export const getSuggesions = (text: string, arr: string[]) => {
    return arr.filter(
        (val) => val?.toLowerCase()?.indexOf(text?.toLowerCase()) > -1
    );
}