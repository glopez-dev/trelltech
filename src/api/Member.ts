import axios from "axios";
import Workspace, { WorkspaceData } from "./Workspace";

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

    workspaces?: Workspace[]

    constructor(data: MemberData) {
        this.id = data.id;
        this.fullName = data.fullName;
        this.username = data.username;
    }

    public static async get(id: string): Promise<Member> {
        const baseURL = Member.baseURL;
        const key = Member.APIKey;
        const token = Member.APIToken;
        const url = `${baseURL}/members/${id}?key=${key}&token=${token}`;

        try {
            const response = await axios.get(url);
            return new Member(response.data);
        } catch (error) {
            console.error("Error getting member:", error.message);
            return null;
        }
    }

    public static async getWorkspaces(id: string): Promise<Workspace[]> {
        const baseURL = Member.baseURL;
        const key = Member.APIKey;
        const token = Member.APIToken;
        const url = `${baseURL}/members/${id}/organizations?key=${key}&token=${token}`;

        try {
            const response = await axios.get(url);
            return response.data.map((data: WorkspaceData) => new Workspace(data));
        } catch (error) {
            console.error("Error getting member organizations:", error.message);
            return null;
        }

    }
}