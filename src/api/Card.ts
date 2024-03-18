import axios from 'axios';
import Member, { MemberData } from './Member';

export interface CardData {
    idList: string
    id: string,
    name?: string,
    desc?: string
}

export default class Card implements CardData {
    private static APIKey: string = process.env.EXPO_PUBLIC_API_KEY;
    private static APIToken: string = process.env.EXPO_PUBLIC_API_TOKEN;
    private static baseURL: string = "https://api.trello.com/1/cards";

    idList: string;
    id: string;
    name: string;
    desc?: string;

    /**
     * Uses the Trello API to create a new Card.
     * 
     * @param idList - The ID of the list the card should be created in (type `string`)
     * @param name - The name for the card (type `string`)
     * @return `Promise<Card | null>` - A Promise that resolves to the newly created Card object, or null if an error occurs
     */
    public static async create(idList: string, name: string): Promise<Card | null> {
        const baseUrl = Card.baseURL;

        const queryParams: string = new URLSearchParams({
            token: Card.APIToken,
            key: Card.APIKey,
            name: name,
            idList: idList,
        }).toString();

        const url = `${baseUrl}?${queryParams}`;

        try {
            const response = await axios.post<CardData>(url);
            return new Card(response.data);
        } catch (error) {
            console.error("Error creating the card:", error.message);
            console.error("Trello API error:", error);
            return null;
        }
    }

    constructor(data: CardData) {
        this.idList = data.idList;
        this.id = data.id;
        this.name = data.name;
        this.desc = data.desc;
    }

    /**
     * Saves changes to the card on Trello.
     * 
     * @return `Promise<Card | null>` - A Promise that resolves to the updated Card object, or null if an error occurs
     */
    public async save(): Promise<Card | null> {
        const baseUrl = Card.baseURL;
        const id = this.id;

        const queryParams: string = new URLSearchParams({
            token: Card.APIToken,
            key: Card.APIKey,
            name: this.name,
            idList: this.idList,
        }).toString();

        const url = `${baseUrl}/${id}?${queryParams}`;

        try {
            const response = await axios.put<CardData>(url);

            return response.status === 200 ? this : null;
        } catch (error) {
            console.error("Error saving the card:", error.message);
            console.error("Trello API error:", error);
            return null;
        }
    }

    /**
     * Fetches a Trello card by ID.
     * 
     * @param id The ID of the card to fetch (type `string`)
     * @return `Promise<Card | null>` A Promise that resolves to the Card object, or null if an error occurs
     */
    public static async get(id: string): Promise<Card | null> {
        const baseURL: string = Card.baseURL;
        const queryParams: string = new URLSearchParams({
            token: Card.APIToken,
            key: Card.APIKey,
        }).toString();

        const url = `${baseURL}/${id}?${queryParams}`;

        try {
            const response = await axios.get<CardData>(url);
            return new Card(response.data);
        } catch (error) {
            console.error("Error getting the card:", error.message);
            console.error("Trello API error:", error);
            return null;
        }

    }

    /**
     * Deletes the Trello card .
     * 
     * @return `Promise<boolean>` A Promise that resolves to true if the card was deleted successfully, false otherwise
     */
    public async delete(): Promise<boolean> {
        const baseURL: string = Card.baseURL;
        const id: string = this.id;

        const queryParams: string = new URLSearchParams({
            token: Card.APIToken,
            key: Card.APIKey,
        }).toString();

        const url = `${baseURL}/${id}?${queryParams}`;

        try {
            const response = await axios.delete(url);
            return response.status === 200;
        } catch (error) {
            console.error("Error deleting the card:", error.message);
            console.error("Trello API error:", error);
            return false;
        }
    }

    public async getMembers(): Promise<Member[]> {
        const id = this.id;
        const baseURL = Card.baseURL;
        const key = Card.APIKey;
        const token = Card.APIToken;
        const url = `${baseURL}/${id}/members?key=${key}&token=${token}`;

        try {
            const { data } = await axios.get(url);
            const members: Member[] = data.map((memberData: MemberData) => new Member(memberData));
            return members;

        } catch (error) {
            console.error("Error getting card members:", error.message);
            return null;
        }
    }

    public async addMember(member: Member): Promise<boolean> {
        const apiKey = Card.APIKey;
        const apiToken = Card.APIToken;
        const url = `${Card.baseURL}/${this.id}/idMembers?value=${member.id}&key=${apiKey}&token=${apiToken}`;

        try {
            const { status } = await axios.put(url);
            console.log(`[Card: addMember] status: ${status}`);
            return status === 200;
        } catch (error) {
            return false;
        }
    }

    public async removeMember(member: Member): Promise<boolean> {
        const apiKey = Card.APIKey;
        const apiToken = Card.APIToken;
        const url = `${Card.baseURL}/${this.id}/idMembers/${member.id}?key=${apiKey}&token=${apiToken}`;

        try {
            const { status } = await axios.delete(url);
            console.log(`[Card: removeMember] status: ${status}`);
            return status === 200;
        } catch {
            return false;
        }

    }

}
