import axios from "axios";
import dotenv from 'dotenv';
import BoardData from "@src/types/BoardData";
import { BoardDataUpdate } from "@src/types/BoardData";
import TrelloID from "@src/types/TrelloID";
dotenv.config();

const key = process.env.KEY;
const token = process.env.TOKEN;

export default class Board {
   

    constructor(data: BoardData | BoardDataUpdate) {
        for (const key in data) {
            this[key] = data[key];
        }
    }
   

   

    static async createBoard(displayname: string, id0rganization: TrelloID): Promise<Board> {
        try {
            const response = await axios.post(`https://api.trello.com/1/boards/?name=${displayname}&key=${key}&token=${token}&idOrganization=${id0rganization}`);
            return new Board(response.data);
        } catch (error) {
            console.error("Error creating workspace:", error.message);
            throw error;
        }
    }

    async getBoard(id: TrelloID) {
        try {
            const response = await axios.get(`https://api.trello.com/1/boards/${id}?key=${key}&token=${token}`);
            return response.data;
        } catch (error) {
            console.error("Error getting workspace:", error.message);
            throw error;
        }
    }

    async deleteWorkspace(id: string) {
        try {
            const response = await axios.delete(`https://api.trello.com/1/organizations/${id}?key=${key}&token=${token}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting workspace:", error.message);
            throw error;
        }
    } 

    async updateWorkspace(id: TrelloID,name: string) {
        try {
            const response = await axios.put(`https://api.trello.com/1/boards/${id}?key=${key}&token=${token}&name=${name}`, {
            });
            return new Board(response.data);
        } catch (error) {
            console.error("Error updating workspace:", error.message);
            throw error;
        }
    }
}


