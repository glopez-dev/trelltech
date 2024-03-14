import axios, { AxiosResponse } from "axios";
import Board from "@src/api/Board";
import Card, { CardData } from "@src/api/Card";

interface ListData {
    id: string,
    name: string,
    idBoard: string
}

export default class List {
    static getLists: any;
    static getBoard(boardId: any) {
        throw new Error('Method not implemented.');
    }

    private static APIKey: string = process.env.EXPO_PUBLIC_API_KEY;
    private static APIToken: string = process.env.EXPO_PUBLIC_API_TOKEN;
    private static baseURL: string = "https://api.trello.com/1/lists";

    /* Mandatory */
    id: string;
    name: string;
    idBoard: string;

    /* The board this list belongs to */
    board: Board;

    /**
     * Creates a new list with the given name and associates it with the specified board.
     *
     * @param {string} name - the name of the new list
     * @param {string} idBoard - the ID of the board to associate the new list with
     * @return {Promise<List>} a Promise that resolves to the newly created List object, or null if an error occurs
     */
    public static async create(name: string, idBoard: string): Promise<List> {
        const baseURL = List.baseURL;

        const queryParams: string = new URLSearchParams({
            key: List.APIKey,
            token: List.APIToken,
            name: name,
            idBoard: idBoard,
        }).toString();

        const url = `${baseURL}?${queryParams}`;

        try {
            const response = await axios.post(url);
            return new List(response.data);
        } catch (error) {
            console.error("Error creating list:", error);
            return null;
        }
    }

    constructor(data: ListData) {
        this.id = data.id;
        this.name = data.name;
        this.idBoard = data.idBoard;
    }

    /**
     * Updates the list by sending it's data to the Trello API. 
     *
     * @return {Promise<List>} The updated list object, or null if an error occurs.
     */
    public async update(): Promise<List> {
        const baseURL = List.baseURL;
        const id = this.id;
        const queryParams: string = new URLSearchParams({
            key: List.APIKey,
            token: List.APIToken,
            name: this.name
        }).toString();

        const url = `${baseURL}/${id}?${queryParams}`;

        try {
            const response = await axios.put(url);
            return this;
        } catch (error) {
            console.error("Error updating list:", error);
            return null;
        }
    }

    public static async update(id: string): Promise<void> {
        const baseURL = List.baseURL;

        const queryParams: string = new URLSearchParams({
            key: List.APIKey,
            token: List.APIToken,
            name: this.name
        }).toString();

        const url = `${baseURL}/${id}?${queryParams}`;

        try {
            const response = await axios.put(url);
        } catch (error) {
            console.error("Error updating list:", error);
            return null;
        }
    }

    /**
     * Retrieves a list by its ID using the Trello API.
     *
     * @param {string} id - the ID of the list to retrieve
     * @return {Promise<List>} a promise that resolves with the retrieved list, or null if an error occurs
     */
    public static async get(id: string): Promise<List> {
        const baseURL = List.baseURL;
        const key = List.APIKey;
        const token = List.APIToken;
        const url = `${baseURL}/${id}?key=${key}&token=${token}`;

        try {
            const response = await axios.get(url);
            return new List(response.data);
        } catch (error) {
            console.error("Error getting list:", error.message);
            return null;
        }
    }

    /**
     * Asynchronously closes (archives) the list by sending a PUT request to the Trello API.
     *
     * @return {Promise<boolean>} true if the record is successfully closed, false otherwise
     */
    public async delete(): Promise<boolean> {
        const id = this.id;
        const baseURL = List.baseURL;

        const queryParams: string = new URLSearchParams({
            key: List.APIKey,
            token: List.APIToken,
            closed: "true",
        }).toString();

        const url = `${baseURL}/${id}?${queryParams}`;

        try {
            const response = await axios.put(url);
            return true;
        } catch (error) {
            console.error("Error deleting list:", error);
            return false;
        }
    }

    public static async delete(id: string): Promise<boolean> {

        const baseURL = List.baseURL;
        const queryParams: string = new URLSearchParams({
            key: List.APIKey,
            token: List.APIToken,
            closed: "true",
        }).toString();

        const url = `${baseURL}/${id}?${queryParams}`;

        try {
            const response = await axios.put(url);
            return true;
        } catch (error) {
            console.error("Error deleting list:", error);
            return false;
        }
    }


    public async getCards(): Promise<Card[]> {
        const listId = this.id;
        const baseURL = List.baseURL;
        const key = List.APIKey;
        const token = List.APIToken;
        const url = `${baseURL}/${listId}/cards?key=${key}&token=${token}`;

        try {
            const response = await axios.get(url);
            const cardDataList: CardData[] = response.data;
            return cardDataList.map((cardData: CardData) => new Card(cardData));
        } catch (error) {
            console.error("Error fetching cards:", error.message);
            throw error;
        }
    }

}