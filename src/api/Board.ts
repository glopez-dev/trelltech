import axios, { AxiosResponse } from "axios";
import List from "@src/api/List";

export interface BoardData {
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

    /** 
    * A Record of thelists associated with this board 
    * Allows to access the list by its ID. 
    */
    lists: Record<string, List>


    public static async create(name: string, idOrganization: string, idBoardSource?: string): Promise<Board> {
        const baseURL = Board.baseURL;

        const queryParams: string = new URLSearchParams({
            token: Board.APIToken,
            key: Board.APIKey,
            name: name,
            idOrganization: idOrganization,
        }).toString();

        const url = `${baseURL}boards?${queryParams}` + (idBoardSource ? `&idBoardSource=${idBoardSource}` : "");

        try {
            const response = await axios.post(url);
            return new Board(response.data);
        } catch (error) {
            console.error("Error creating board:", error.message, "\nServer error message:", error.response.data.message);
            return null;
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


    public static async getLists(id: string): Promise<List[]> {
        const baseURL = Board.baseURL;
        const key = Board.APIKey;
        const token = Board.APIToken;

        const url = `${baseURL}boards/${id}/lists?key=${key}&token=${token}`;

        try {
            const response = await axios.get<List[]>(url);
            return response.data;
        } catch (error) {
            console.error("Error getting lists:", error.message);
            return [];
        }
    }

    public async delete(): Promise<boolean> {
        const baseURL = Board.baseURL;
        const key = Board.APIKey;
        const token = Board.APIToken;
        const url = `${baseURL}boards/${this.id}?key=${key}&token=${token}`;

        try {
            const response = await axios.delete(url);
            return response.status === 200;
        } catch (error) {
            console.error("Error deleting board:", error.message);
            return false;
        }
    }
    public static async delete(boardId: string): Promise<boolean> {
        const baseURL = Board.baseURL;
        const key = Board.APIKey;
        const token = Board.APIToken;
        const url = `${baseURL}boards/${boardId}?key=${key}&token=${token}`;

        try {
            const response = await axios.delete(url);
            return true;
        } catch (error) {
            console.error("Error deleting board:", error.message);
            return false;
        }
    }
}