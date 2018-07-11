import Player from '../Player';
import TicTacToe from '../TicTacToe';
import { GameTree } from './GameTree';

describe('Creating game trees', () => {
    test.skip('Creating a game tree', () => {
        const game = new TicTacToe();
        const player = Player.Cross;

        const tree = new GameTree(game, player);
        const move = tree.move;

        expect(move).toBeDefined();
    });

    test('a game tree with only one missing move', () => {
        const game = new TicTacToe();
        const player = Player.Cross;

        game.doAction(2, 2, Player.Cross);
        game.doAction(0, 0, Player.Nought);
        game.doAction(2, 0, Player.Cross);
        game.doAction(1, 0, Player.Nought);
        game.doAction(0, 1, Player.Cross);
        game.doAction(1, 1, Player.Nought);
        game.doAction(1, 2, Player.Cross);
        game.doAction(0, 2, Player.Nought);

        const tree = new GameTree(game, player);
        const move = tree.move;

        expect(move).toBeDefined();
        expect(move.x).toEqual(2);
        expect(move.y).toEqual(1);
    });

    test('a game tree with one winning move', () => {
        const game = new TicTacToe();
        const player = Player.Cross;

        game.doAction(2, 2, Player.Cross);
        game.doAction(1, 1, Player.Nought);
        game.doAction(2, 0, Player.Cross);
        game.doAction(1, 0, Player.Nought);

        const tree = new GameTree(game, player);
        const move = tree.move;

        expect(move).toBeDefined();
        expect(move.x).toEqual(2);
        expect(move.y).toEqual(1);
    });

    test('a game tree with only one winning move for Nought', () => {
        const game = new TicTacToe();
        const player = Player.Nought;

        game.doAction(2, 2, Player.Cross);
        game.doAction(1, 1, Player.Nought);
        game.doAction(2, 0, Player.Cross);
        game.doAction(1, 0, Player.Nought);
        game.doAction(0, 1, Player.Cross);

        const tree = new GameTree(game, player);
        const move = tree.move;

        expect(move).toBeDefined();
        expect(move.x).toEqual(1);
        expect(move.y).toEqual(2);
    });

    test('A game tree for Noughts with a winning move for Crosses', () => {
        const game = new TicTacToe();
        const player = Player.Nought;

        game.doAction(0, 0, Player.Cross);
        game.doAction(1, 0, Player.Nought);
        game.doAction(2, 2, Player.Cross);

        const tree = new GameTree(game, player);
        const move = tree.move;

        expect(move).toBeDefined();
        expect(move.x).toEqual(1);
        expect(move.y).toEqual(1);
    });

    test('An opening move in the corner for crosses', () => {
        const game = new TicTacToe();
        const player = Player.Nought;

        game.doAction(0, 0, Player.Cross);
        game.doAction(2, 0, Player.Nought);
        game.doAction(2, 2, Player.Cross);

        const tree = new GameTree(game, player);
        const move = tree.move;

        expect(move).toBeDefined();
        expect(move.x).toEqual(1);
        expect(move.y).toEqual(1);
    });
});

describe('Testing board score evaluation', () => {
    test('A finished board', () => {
        const game = new TicTacToe();
        const player = Player.Nought;

        game.doAction(0, 0, Player.Cross);
        game.doAction(1, 0, Player.Nought);
        game.doAction(2, 0, Player.Cross);
        game.doAction(2, 1, Player.Nought);
        game.doAction(0, 1, Player.Cross);
        game.doAction(1, 1, Player.Nought);
        game.doAction(1, 2, Player.Cross);
        game.doAction(0, 2, Player.Nought);
        game.doAction(2, 2, Player.Cross);
        expect(game.hasEnded()).toBeTruthy();

        const tree = new GameTree(game, player);
        const value = tree.value;
        expect(value).toEqual(0);
    });
});
