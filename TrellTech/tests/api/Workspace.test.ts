import { jest, beforeAll, describe, expect, it } from '@jest/globals';
import Workspace from '@src/api/Workspace';


describe('Workspace class', () => {

    let workspace: Workspace;

    it('should create a new workspace', async () => {
        workspace = await Workspace.create("My Workspace");
        expect(workspace.displayName).toBe("My Workspace");
    });

    it('should update the workspace', async () => {
        workspace.displayName = "My Updated Workspace";
        const updatedWorkspace = await workspace.update();
        expect(updatedWorkspace.displayName).toBe("My Updated Workspace");
    });

    it('should get the workspace', async () => {
        const retrievedWorkspace = await Workspace.get(workspace.id);
        expect(retrievedWorkspace.displayName).toBe("My Updated Workspace");
    });

    it('should delete the workspace', async () => {
        const deleted = await workspace.delete();
        expect(deleted).toBe(true);
    });

});


