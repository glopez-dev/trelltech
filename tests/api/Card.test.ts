import { jest, beforeAll, afterAll, describe, expect, it } from '@jest/globals';
import Workspace from '@src/api/Workspace';
import Board from '@src/api/Board';
import List from '@src/api/List';
import Card from '@src/api/Card';

describe('Card class', () => {

    let workspace: Workspace;
    let board: Board;
    let list: List;
    let card: Card;

    beforeAll(async () => {
        workspace = await Workspace.create("My Workspace");
        board = await Board.create("My Board", workspace.id);
        list = await List.create("My List", board.id);
    });


    it('should create a new card', async () => {
        card = await Card.create(list.id, "My Card");
        expect(card.name).toBe("My Card");
        expect(card.idList).toBe(list.id);
    });

    it('should update the card', async () => {
        card.name = "My Updated Card";
        const updatedCard = await card.save();
        expect(updatedCard.name).toBe("My Updated Card");
    });

    it('should get the card', async () => {
        const retrievedCard = await Card.get(card.id);
        expect(retrievedCard.name).toBe("My Updated Card");
    });

    it('should delete the card', async () => {
        const deletedCard = await card.delete();
        expect(deletedCard).toBe(true);
    });

    afterAll(async () => {
        await list.delete();
        await board.delete();
        await workspace.delete();
    })
})

