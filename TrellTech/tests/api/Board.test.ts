import { jest, beforeAll, describe, expect, it } from '@jest/globals';
import Board from '@src/api/Board';


describe('Board class', () => {

    let board: Board;

    it('should create a new board', async () => {
        board = await Board.create("My Board");
        expect(board.name).toBe("My Board");
        expect(board.id).toBeDefined();
    });

    it('should update the board', async () => {
        board.name = "My Updated Board";
        const updatedBoard = await board.update();
        expect(updatedBoard.name).toBe("My Updated Board");
    });

    it('should get the board', async () => {
        const retrievedBoard = await Board.get(board.id);
        expect(retrievedBoard.name).toBe("My Updated Board");
        expect(retrievedBoard.id).toBe(board.id);
    });

    it('should delete the board', async () => {
        const deleted = await board.delete();
        expect(deleted).toBe(true);
    });

});
