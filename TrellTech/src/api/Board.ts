import axios, { AxiosResponse } from "axios";

interface BoardData {
    /* Mandatory */
    id: string
    name: string
    /* Optionnal */
    desc: string
    descData: string,
    closed: boolean,
    idOrganization: string
}

export default class Board implements BoardData {

    private static APIKey: string = process.env.EXPO_PUBLIC_API_KEY;
    private static APIToken: string = process.env.EXPO_PUBLIC_API_TOKEN;
    private static baseURL: string = "https://api.trello.com/1/";

    /* Mandatory */
    id: string
    name: string
    /* Optionnal */
    desc: string
    descData: string
    closed: boolean
    idOrganization: string


    public static async create(name: string): Promise<Board> {
        const baseURL = Board.baseURL;
        const token = Board.APIToken;
        const key = Board.APIKey;
        const encodedName = encodeURIComponent(name);

        const url = `${baseURL}boards?key=${key}&token=${token}&name=${encodedName}`

        try {
            const response = await axios.post(url);
            return new Board(response.data);
        } catch (error) {
            console.error("Error creating board:", error.message);
        }
    }

    constructor(data: BoardData) {
        this.id = data.id;
        this.name = data.name;
        this.desc = data.desc;
        this.descData = data.descData;
        this.closed = data.closed;
        this.idOrganization = data.idOrganization;
    }

    public async update(): Promise<Board> {
        const id = this.id;

        const queryParams: string = new URLSearchParams({
            key: Board.APIKey,
            token: Board.APIToken,
            name: this.name,
            desc: this.desc,
            descData: this.descData,
            closed: this.closed.toString(),
            idOrganization: this.idOrganization,
        }).toString();

        const url = `${Board.baseURL}boards/${id}?${queryParams}`;

        try {
            const response = await axios.put(url);
            return this;
        } catch (error) {
            console.error("Error updating board:", error.message);
        }
    }

    public static async get(id: string): Promise<Board> {
        const baseURL = Board.baseURL;
        const key = Board.APIKey;
        const token = Board.APIToken;
        const url = `${baseURL}boards/${id}?key=${key}&token=${token}`;

        try {
            const response = await axios.get(url);
            return new Board(response.data);
        } catch (error) {
            console.error("Error getting board:", error.message);
            return null;
        }
    }

    public async delete(): Promise<boolean> {
        const baseURL = Board.baseURL;
        const key = Board.APIKey;
        const token = Board.APIToken;
        const url = `${baseURL}boards/${this.id}?key=${key}&token=${token}`;

        try {
            const response = await axios.delete(url);
            return true;
        } catch (error) {
            console.error("Error deleting board:", error.message);
            return false;
        }
    }
}