import { jest, beforeAll, describe, expect, it } from '@jest/globals';
import Workspace from '@src/api/Workspace';
import Board from '@src/api/Board';
import List from '@src/api/List';
import Card from '@src/api/Card';

describe('List class', () => {

    let list: List;
    let organization: Workspace;
    let board: Board;


    beforeAll(async () => {
        organization = await Workspace.create("Test Organization");
    });

    beforeAll(async () => {
        board = await Board.create("My Board", organization.id);
    });

    it('should create a new List', async () => {
        list = await List.create("My List", board.id);
        expect(list.name).toBe("My List");
        expect(list.idBoard).toBe(board.id);
    });

    it('should update the List', async () => {
        list.name = "My Updated List";
        const updatedList = await list.update();
        expect(updatedList.name).toBe("My Updated List");
    });

    it('should get the List', async () => {
        const retrievedList = await List.get(list.id);
        expect(retrievedList.name).toBe("My Updated List");
        expect(retrievedList.id).toBe(list.id);
    });

    it('should get the list cards', async () => {
        const card: Card = await Card.create(list.id, "My Card");
        const cards: Card[] = await List.getCards(list.id);
        expect(cards.length).toBe(1);
        expect(cards[0].name).toBe("My Card");
    })

    it('should delete the List', async () => {
        const deleted = await list.delete();
        expect(deleted).toBe(true);
    });

});