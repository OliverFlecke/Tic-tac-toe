import TicTacToe from '../TicTacToe';
import Agent from './Agent';

describe('Agent will return a location', () => {
    test.skip('returns a location when asked', () => {
        const game = new TicTacToe();
        const agent = new Agent();

        const location = agent.getMove(game);
        expect(location).toBeDefined();
    });
});
