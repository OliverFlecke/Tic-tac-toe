import Location from './Location';
import Player from './Player';
import Result from './Result';
import TicTacToe from './TicTacToe';

const completeGame = () => {
    const game = new TicTacToe();
    game.doAction(2, 2, Player.Cross);
    game.doAction(0, 0, Player.Nought);
    game.doAction(2, 0, Player.Cross);
    game.doAction(1, 0, Player.Nought);
    game.doAction(0, 1, Player.Cross);
    game.doAction(1, 1, Player.Nought);
    game.doAction(2, 1, Player.Cross);
    game.doAction(0, 2, Player.Nought);
    game.doAction(1, 2, Player.Cross);

    return game;
};

describe('Basic tests of the game.', () => {
    test('Can render the empty game', () => {
        const game = new TicTacToe();
        expect(game.toString()).toEqual(' | | \n | | \n | | ');
    });

    test('Can render a game with Xs and Os', () => {
        const game = new TicTacToe();
        game.doAction(1, 1, Player.Cross);
        game.doAction(0, 0, Player.Nought);
        expect(game.toString()).toEqual('O| | \n |X| \n | | ');
    });

    test('Can render a game with Xs and Os', () => {
        const game = new TicTacToe();
        game.doAction(2, 2, Player.Cross);
        game.doAction(0, 0, Player.Nought);
        game.doAction(2, 0, Player.Cross);
        game.doAction(1, 0, Player.Nought);
        game.doAction(0, 1, Player.Cross);
        game.doAction(1, 1, Player.Nought);
        game.doAction(2, 1, Player.Cross);
        game.doAction(0, 2, Player.Nought);
        game.doAction(1, 2, Player.Cross);
        expect(game.toString()).toEqual('O|O|X\nX|O|X\nO|X|X');
    });
});

describe('Game can check if there are any more possible moves', () => {
    test('A new game', () => {
        const game = new TicTacToe();
        expect(game.noMorePossibleMoves()).toBeFalsy();
    });
    test('A game with some amount of moves', () => {
        const game = new TicTacToe();
        game.doAction(0, 1, Player.Cross);
        game.doAction(1, 1, Player.Nought);
        game.doAction(2, 1, Player.Cross);
        game.doAction(0, 2, Player.Nought);
        game.doAction(1, 2, Player.Cross);
        expect(game.noMorePossibleMoves()).toBeFalsy();
    });
    test('A game with all cells occupied', () => {
        const game = completeGame();
        expect(game.noMorePossibleMoves()).toBeTruthy();
    });
});

describe('Can find the result of the game', () => {

    test('Can find the winner of the game horizontally', () => {
        for (let y = 0; y < 3; y++) {
            // Setup
            const game = new TicTacToe();
            game.doAction(0, y, Player.Cross);
            game.doAction(0, y ? 0 : y + 1, Player.Nought);
            game.doAction(1, y, Player.Cross);
            game.doAction(1, y ? 0 : y + 1, Player.Nought);
            game.doAction(2, y, Player.Cross);

            // Assert
            expect(game.winner).toEqual(Player.Cross);
        }
    });

    test('Can find the winner of the game vertically', () => {
        for (let x = 0; x < 3; x++) {
            // Setup
            const game = new TicTacToe();
            game.doAction(x, 0, Player.Cross);
            game.doAction(x ? 0 : x + 1, 0, Player.Nought);
            game.doAction(x, 1, Player.Cross);
            game.doAction(x ? 0 : x + 1, 1, Player.Nought);
            game.doAction(x, 2, Player.Cross);

            // Assert
            expect(game.winner).toEqual(Player.Cross);
        }
    });

    test('Can find the winner in the diagonal', () => {
        // Setup
        const game = new TicTacToe();
        for (let i = 0; i < 3; i++) {
            game.doAction(i, i, Player.Cross);
            if (i === 0) game.doAction(2, 0, Player.Nought);
            if (i === 1) game.doAction(2, 1, Player.Nought);
        }

        // Assert
        expect(game.toString()).toEqual('X| |O\n |X|O\n | |X');
        expect(game.winner).toEqual(Player.Cross);
    });

    test('Can find the winner in the second diagonal', () => {
        // Setup
        const game = new TicTacToe();
        for (let i = 0; i < 3; i++) {
            game.doAction(2 - i, i, Player.Cross);
            if (i === 0) game.doAction(0, 0, Player.Nought);
            if (i === 1) game.doAction(0, 1, Player.Nought);
        }

        // Assert
        expect(game.toString()).toEqual('O| |X\nO|X| \nX| | ');
        expect(game.winner).toEqual(Player.Cross);
    });

    test('The game is a tie if all cells are occupied', () => {
        const game = new TicTacToe();

        game.doAction(2, 2, Player.Cross);
        game.doAction(0, 0, Player.Nought);
        game.doAction(2, 0, Player.Cross);
        game.doAction(2, 1, Player.Nought);
        game.doAction(0, 1, Player.Cross);
        game.doAction(1, 1, Player.Nought);
        game.doAction(1, 0, Player.Cross);
        game.doAction(0, 2, Player.Nought);
        game.doAction(1, 2, Player.Cross);

        expect(game.toString()).toMatchSnapshot();
        expect(game.noMorePossibleMoves()).toBeTruthy();
        expect(game.result).toEqual(Result.Tie);
    });

    test('Game has no more possible moves, but there is a winner', () => {
        const game = new TicTacToe();

        game.doAction(2, 2, Player.Cross);
        game.doAction(0, 0, Player.Nought);
        game.doAction(2, 0, Player.Cross);
        game.doAction(1, 0, Player.Nought);
        game.doAction(0, 1, Player.Cross);
        game.doAction(1, 1, Player.Nought);
        game.doAction(2, 1, Player.Cross);
        game.doAction(0, 2, Player.Nought);
        game.doAction(1, 2, Player.Cross);

        expect(game.toString()).toMatchSnapshot();
        expect(game.noMorePossibleMoves()).toBeTruthy();
        expect(game.result).toEqual(Result.Crosses);
    });
});

describe('Doing actions in a round of the game.', () => {
    test('Crosses have to start', () => {
        const game = new TicTacToe();

        game.doAction(0, 0, Player.Cross);

        expect(game.grid[0][0]).toEqual(Player.Cross);
    });

    test('Noughts cannot make the first move', () => {
        const game = new TicTacToe();

        function doAction() {
            game.doAction(0, 0, Player.Nought);
        }
        expect(doAction).toThrowErrorMatchingSnapshot();
    });

    test('Noughts cannot make two moves in a row', () => {
        const game = new TicTacToe();

        game.doAction(0, 2, Player.Cross);
        game.doAction(0, 0, Player.Nought);
        function doAction() {
            game.doAction(0, 1, Player.Nought);
        }

        expect(game.getLocation(0, 0)).toEqual(Player.Nought);
        expect(doAction).toThrowErrorMatchingSnapshot();
    });

    test('Crosses cannot make two moves in a row', () => {
        const game = new TicTacToe();

        game.doAction(0, 0, Player.Cross);
        function doAction() {
            game.doAction(0, 1, Player.Cross);
        }

        expect(game.getLocation(0, 0)).toEqual(Player.Cross);
        expect(doAction).toThrowErrorMatchingSnapshot();
    });

    test('An action cannot be taken on a spot that is occupied', () => {
        // Setup
        const game = new TicTacToe();
        game.doAction(0, 0, Player.Cross);

        // Test function
        function doAction() {
            game.doAction(0, 0, Player.Nought);
        }

        expect(game.getLocation(0, 0)).toEqual(Player.Cross);
        expect(doAction).toThrowErrorMatchingSnapshot();
        expect(game.getLocation(0, 0)).toEqual(Player.Cross);
    });

    test('It is not possible to make a move when all cells are field', () => {
        const game = new TicTacToe();

        function doAction() {
            game.doAction(0, 0, Player.Nought);
        }

        game.doAction(2, 2, Player.Cross);
        game.doAction(0, 0, Player.Nought);
        game.doAction(2, 0, Player.Cross);
        game.doAction(1, 0, Player.Nought);
        game.doAction(0, 1, Player.Cross);
        game.doAction(1, 1, Player.Nought);
        game.doAction(2, 1, Player.Cross);
        game.doAction(0, 2, Player.Nought);
        game.doAction(1, 2, Player.Cross);

        expect(game.toString()).toMatchSnapshot();
        expect(game.noMorePossibleMoves()).toBeTruthy();
        expect(doAction).toThrowErrorMatchingSnapshot();
    });
});

describe('Testing agent', () => {
    test('finding no free cells in a finished game', () => {
        const game = new TicTacToe();

        game.doAction(2, 2, Player.Cross);
        game.doAction(0, 0, Player.Nought);
        game.doAction(2, 0, Player.Cross);
        game.doAction(1, 0, Player.Nought);
        game.doAction(0, 1, Player.Cross);
        game.doAction(1, 1, Player.Nought);
        game.doAction(2, 1, Player.Cross);
        game.doAction(0, 2, Player.Nought);
        game.doAction(1, 2, Player.Cross);

        const freeLocations = game.freeLocations();

        expect(freeLocations.length).toEqual(0);
    });

    test('finding all the free cells in a game', () => {
        const game = new TicTacToe();

        game.doAction(2, 2, Player.Cross);
        game.doAction(0, 0, Player.Nought);
        game.doAction(2, 0, Player.Cross);
        game.doAction(1, 0, Player.Nought);
        game.doAction(0, 1, Player.Cross);

        const freeLocations = game.freeLocations();

        expect(freeLocations).toHaveLength(4);
        expect(freeLocations).toContainEqual(new Location(1, 2));
        expect(freeLocations).toContainEqual(new Location(1, 1));
        expect(freeLocations).toContainEqual(new Location(2, 1));
        expect(freeLocations).toContainEqual(new Location(0, 2));
    });

    test('find all cells in a new game', () => {
        const game = new TicTacToe();
        const freeLocations = game.freeLocations();

        // Check for free locations
        expect(freeLocations).toHaveLength(9);
        expect(freeLocations).toContainEqual(new Location(0, 0));
        expect(freeLocations).toContainEqual(new Location(0, 1));
        expect(freeLocations).toContainEqual(new Location(0, 2));
        expect(freeLocations).toContainEqual(new Location(1, 0));
        expect(freeLocations).toContainEqual(new Location(1, 1));
        expect(freeLocations).toContainEqual(new Location(1, 2));
        expect(freeLocations).toContainEqual(new Location(2, 0));
        expect(freeLocations).toContainEqual(new Location(2, 1));
        expect(freeLocations).toContainEqual(new Location(2, 2));
    });
});

describe('Cloning a game', () => {
    test('creating a simple deep clone', () => {
        const game = new TicTacToe();

        const clone = game.clone();

        expect(clone).not.toBe(game);
        expect(clone.grid).not.toBe(game.grid);
        expect(clone.grid).toEqual(game.grid);
        expect(clone.currentPlayer).toEqual(game.currentPlayer);

        clone.doAction(0, 0, Player.Cross);

        expect(clone.getLocation(0, 0)).toEqual(Player.Cross);
        expect(game.getLocation(0, 0)).toEqual(Player.None);
    });
});
