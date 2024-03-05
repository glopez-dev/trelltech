import axios from "axios";

export interface MemberData {
    id: string
    fullName: string
    username: string
}

export default class Member implements MemberData {
    private static APIKey: string = process.env.EXPO_PUBLIC_API_KEY
    private static APIToken: string = process.env.EXPO_PUBLIC_API_TOKEN
    private static baseURL: string = "https://api.trello.com/1"

    id: string
    fullName: string
    username: string

    constructor(data: MemberData) {
        this.id = data.id;
        this.fullName = data.fullName;
        this.username = data.username;
    }

}