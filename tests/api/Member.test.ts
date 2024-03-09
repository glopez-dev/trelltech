import { jest, beforeAll, describe, expect, it } from '@jest/globals';
import Member from '@src/api/Member';


describe('Member class', () => {

    it('should get member isaac meil by ID', async () => {
        const id = '622a3d0f72bc0865d9a6f349';
        const member = await Member.get(id);
        expect(member.id).toBe(id);
        expect(member.fullName).toBe('isaac meil');
    });

    it('should get member isaac meil workspaces', async () => {
        const id = '622a3d0f72bc0865d9a6f349';
        const workspaces = await Member.getWorkspaces(id);
        expect(workspaces).toBeDefined();
        expect(workspaces.length).toBeGreaterThan(0);
    });

})