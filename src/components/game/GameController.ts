import Agent from './agent/Agent';
import Location from './Location';
import Result from './Result';
import TicTacToe from './TicTacToe';

export default class GameController {

    private game: TicTacToe;
    private agent: Agent;

    public get grid() {
        return this.game.grid.slice();
    }

    public get currentPlayer() {
        return this.game.currentPlayer;
    }

    constructor() {
        this.agent = new Agent();
        this.game = new TicTacToe();
    }

    /**
     * Make a move in the game
     */
    public makeMove(location: Location) {
        if (this.game.noMorePossibleMoves()) return;
        if (this.game.result !== Result.None) return;

        this.game.doAction(location.x, location.y, this.game.currentPlayer);

        // Do action for agent
        if (!this.game.hasEnded()) {
            const agentLocation = this.agent.getMove(this.game);
            this.game.doAction(agentLocation.x, agentLocation.y, this.game.currentPlayer);
        }
    }

    public hasEnded() {
        return this.game.hasEnded();
    }

    public reset() {
        this.game.reset();
    }

}
