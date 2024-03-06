import { jest, beforeAll, describe, expect, it } from '@jest/globals';
import Member from '@src/api/Member';


describe('Member class', () => {

    it('should get member gaming geekou by ID', async () => {
        const id = '61e6cce3c5e67b1957bf386b';
        const member = await Member.get(id);
        expect(member.id).toBe(id);
        expect(member.fullName).toBe('gaming geekou');
    });

    it('should get member gaming geekou workspaces', async () => {
        const id = '61e6cce3c5e67b1957bf386b';
        const workspaces = await Member.getWorkspaces(id);
        expect(workspaces).toBeDefined();
        expect(workspaces.length).toBeGreaterThan(0);
    });

})