import axios from "axios";
import dotenv from 'dotenv';
import WorkspaceData from "@src/types/workspaceData";
dotenv.config();

const key = process.env.KEY;
const token = process.env.TOKEN;

export default class Workspace {
   

    constructor(data: WorkspaceData) {
        for (const key in data) {
            this[key] = data[key];
        }
    }

    static async createWorkspace(displayname: string): Promise<Workspace> {
        try {
            const response = await axios.post(`https://api.trello.com/1/organizations?displayName=${displayname}&key=${key}&token=${token}`);
            return new Workspace(response.data);
        } catch (error) {
            console.error("Error creating workspace:", error.message);
            throw error;
        }
    }

    async getWorkspaces(id: string) {
        try {
            const response = await axios.get(`https://api.trello.com/1/organizations/${id}?key=${key}&token=${token}`);
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

    async updateWorkspace(id: string) {
        try {
            const response = await axios.put(`https://api.trello.com/1/organizations/${id}?key=${key}&token=${token}`, {
                displayName: this.displayname
            });
            return response.data;
        } catch (error) {
            console.error("Error updating workspace:", error.message);
            throw error;
        }
    }
}


