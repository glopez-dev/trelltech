import axios, { AxiosResponse } from "axios";

interface BoardData {
    /* Mandatory */
    id: string
    /* Optionnal */
    actions?: string
    boardStars?: string
    cards?: string
    card_pluginData?: boolean
    checklists?: string
    customFields?: boolean
    fields?: string
    labels?: string
    lists?: string
    members?: string
    memberships?: string
    pluginData?: boolean
    organization?: boolean
    organization_pluginData?: boolean
    myPrefs?: boolean
    tags?: boolean
}

export default class Person implements BoardData {

    private static APIKey: string = process.env.EXPO_PUBLIC_API_KEY;
    private static APIToken: string = process.env.EXPO_PUBLIC_API_TOKEN;
    private static baseURL: string = "https://api.trello.com/1/";


} 