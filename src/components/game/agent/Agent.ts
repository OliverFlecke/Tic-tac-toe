import Location from '../Location';
import Player from '../Player';
import TicTacToe from '../TicTacToe';
import { GameTree } from './GameTree';

/**
 * @class Represent an agent cabable of playing tic-tac-toe
 */
export default class Agent {

    /**
     * difficulty between 0 and 1
     */

    private _difficulty : number = 1;
    public get difficulty() : number {
        return this._difficulty;
    }
    public set difficulty(v : number) {
        this._difficulty = v;
    }

    /**
     * @param game The game of tic-tac-toe which the agent is playing
     * @returns The location which the player should play next
     */
    public getMove(game: TicTacToe): Location {
        if (Math.random() > this.difficulty) {
            const freeLocations = game.freeLocations();

            return freeLocations[Math.floor(Math.random() * freeLocations.length)];
        }

        const gameTree = new GameTree(game, Player.Nought);

        return gameTree.move;
    }
}
