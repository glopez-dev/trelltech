import axios from "axios";
class WorkspaceViewModel {

    displayname: string;
    id: string;

    constructor(displayname: string, id: string) {
        this.displayname = displayname;
        this.id = id;
    }

    async createWorkspace() {
        try {
            await axios.post("https://api.trello.com/1/boards/?key=791445c8609a53b81f05ca51b836f1c8&token=ATTA3abab223c6b99cf69dc04e56ec8bccf093bf625555a0f252789df324c1df5515FF5D4BE4", {
                displayname: this.displayname,
            });
        } catch (error) {
            console.error("Error creating workspace:", error);
            throw error;
        }
    }

    async getWorkspaces() {
        try {
            const response = await axios.get("https://api.trello.com/1/organizations/{id}?key=APIKey&token=APIToken");
            return response.data;
        } catch (error) {
            console.error("Error getting workspaces:", error);
            throw error;
        }
    }

    async deleteWorkspace() {
        try {
            await axios.delete(`https://api.trello.com/1/organizations/{id}?key=APIKey&token=APIToken`);
        } catch (error) {
            console.error("Error deleting workspace:", error);
            throw error;
        }
    }

    async updateWorkspace() {
        try {
            await axios.put(`https://api.trello.com/1/organizations/{id}?key=APIKey&token=APIToken`, {
                displayname: this.displayname,
            });
        }
        catch (error) {
            console.error("Error updating workspace:", error);
            throw error;
        }

    }

}



export default WorkspaceViewModel

