import axios, { AxiosResponse } from "axios";
import Member, { MemberData } from "@src/api/Member";
import Board, { BoardData } from "@src/api/Board";

export interface WorkspaceData {
    /* Mandatory */
    id: string,
    displayName: string,
    /* Optionnal */
    name?: string,
    desc?: string,
    website?: string,
}

export default class Workspace implements WorkspaceData {

    private static APIKey: string = process.env.EXPO_PUBLIC_API_KEY;
    private static APIToken: string = process.env.EXPO_PUBLIC_API_TOKEN;
    private static baseURL: string = "https://api.trello.com/1/organizations";

    /* Mandatory */
    id: string;
    displayName: string;
    /* Optionnal */
    name?: string;
    desc?: string;
    website?: string;

    /**
     * Static method used to create a new workspace in Trello 
     * and instanciate a new Workspace model to manipulate it.
     *
     * @param {string} displayName - The displayed name of the workspace
     * @returns {Workspace} The newly created workspace
     */
    public static async create(displayName: string): Promise<Workspace> {

        const token = Workspace.APIToken;
        const key = Workspace.APIKey;
        const encodedDisplayName = encodeURIComponent(displayName);

        const url = `${Workspace.baseURL}?key=${key}&token=${token}&displayName=${encodedDisplayName}`

        try {
            const response = await axios.post(url);
            return new Workspace(response.data);
        } catch (error) {
            console.error("Error creating workspace:", error.message);
        }
    }

    constructor(data: WorkspaceData) {
        this.id = data.id;
        this.displayName = data.displayName;
        this.name = data.name;
        this.desc = data.desc;
        this.website = data.website;
    }


    /**
     * Method used to update the workspace in Trello
     *
     * @returns {Workspace} The updated workspace
     */
    public async update(): Promise<Workspace> {
        const id = this.id;

        const queryParams: string = new URLSearchParams({
            key: Workspace.APIKey,
            token: Workspace.APIToken,
            name: this.name,
            displayName: this.displayName,
            desc: this.desc,
            website: this.website,
        }).toString();

        const url = `${Workspace.baseURL}/${id}?${queryParams}`

        try {
            const response = await axios.put(url);

            return this;
        } catch (error) {
            console.error("Error updating workspace:", error.message);
            return null;
        }
    }

    /**
     * Retrieves a workspace by its ID using the provided parameter.
     *
     * @param {string} id - the ID of the workspace to retrieve
     * @return {Promise<Workspace>} a Promise that resolves with the retrieved workspace
     */
    public static async get(id: string): Promise<Workspace> {
        const baseURL = Workspace.baseURL;
        const key = Workspace.APIKey;
        const token = Workspace.APIToken;
        const url = `${baseURL}/${id}?key=${key}&token=${token}`

        try {
            const response = await axios.get(url);
            return new Workspace(response.data);
        } catch (error) {
            console.error("Error getting workspace:", error.message);
            throw error;
        }
    }

    /**
     * Deletes a workspace by its ID.
     *
     * @param {string} id - The ID of the resource to be deleted
     * @return {Promise<boolean>} A boolean indicating the success of the deletion
     */
    public static async delete(id: string): Promise<boolean> {
        const baseURL = Workspace.baseURL;
        const key = Workspace.APIKey;
        const token = Workspace.APIToken;
        const url = `${baseURL}/${id}?key=${key}&token=${token}`

        try {
            const response = await axios.delete(url);
            return true;
        } catch (error) {
            console.error("Error deleting workspace:", error.message);
            return false;
        }
    }

    /**
     * Deletes the instance of the workspace it's called on.
     *
     * @return {Promise<boolean>} A boolean indicating the success of the deletion
     */
    public async delete(): Promise<boolean> {
        const baseURL = Workspace.baseURL;
        const key = Workspace.APIKey;
        const token = Workspace.APIToken;
        const url = `${baseURL}/${this.id}?key=${key}&token=${token}`

        try {
            const response = await axios.delete(url);
            return (response.status === 200);
        } catch (error) {
            console.error("Error deleting workspace:", error.message);
        }
    }

    /**
     * Retrieves the members of the workspace from the API.
     *
     * @return {Promise<Record<string, Member>>} A promise that resolves to a record of members
     */
    public async getMembers(): Promise<Record<string, Member>> {
        const id = this.id;
        const baseURL = Workspace.baseURL;
        const key = Workspace.APIKey;
        const token = Workspace.APIToken;
        const url = `${baseURL}/${id}/members?key=${key}&token=${token}`;

        try {
            const response = await axios.get(url);
            const members: Record<string, Member> = {};

            response.data.map((memberData: MemberData) => {
                const member = new Member(memberData);
                members[member.id] = member;
            });

            return members;
        } catch (error) {
            console.error("Error getting workspace members:", error.message);
            return null;
        }
    }


    async getBoards(): Promise<Board[]> {
        const baseURL = Workspace.baseURL;
        const key = Workspace.APIKey;
        const token = Workspace.APIToken;
        const id = this.id;

        const url = `${baseURL}/${id}/boards?key=${key}&token=${token}`;

        try {
            const response = await axios.get(url);
            const boardDataList: BoardData[] = response.data;
            return boardDataList.map((boardData: BoardData) => new Board(boardData));

        } catch (error) {
            console.error("Error fetching boards:", error.message);
            throw error;
        }
    }

    async addBoard(name: string): Promise<Board> {
        const board = await Board.create(name, this.id);
        const boards = await this.getBoards();
        boards.push(board);
        return board;
    }


}

