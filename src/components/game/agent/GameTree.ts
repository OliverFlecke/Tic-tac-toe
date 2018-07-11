import Location from '../Location';
import Player from '../Player';
import TicTacToe from '../TicTacToe';

class GameTree {
    private root: Node;

    public get move(): Location {
        const max = Math.max(...this.root.children.map(x => x.value));
        const move = this.root.children.filter(node => node.value === max)[0].move;

        return move;
    }

    public get value(): number {
        return this.root.value;
    }

    constructor(game: TicTacToe, player: Player) {
        this.root = new MaxNode(game, player);
    }
}

// tslint:disable-next-line:max-classes-per-file
abstract class Node {

    protected _value : number;
    public get value() : number {
        return this._value;
    }

    public depth: number;

    protected game: TicTacToe;
    protected player: Player;
    private _move : Location;
    public get move() : Location {
        return this._move;
    }

    protected _children: Node[] = [];
    public get children(): Node[] {
        return this._children;
    }

    /**
     * @param game The game that is being played
     * @param player The player whom is playing the game
     * @param move The location which the current move have been made on
     * @param depth The depth of the tree
     */
    constructor(game: TicTacToe, player: Player, move?: Location, depth = 0) {
        this.depth = depth;
        this.player = player;
        this.game = game.clone();
        if (move) {
            this._move = move;
            this.game.doAction(move.x, move.y);
        }

        if (depth < 9 && !this.game.hasEnded()) {
            this.generateChildren();
        }

        this.evaluate();
    }

    public toString(): string {
        return 'Depth: ' + this.depth
            + ' \tValue: ' + this.value
            + (this.move ? '\tMove:' + this.move.toString()
                + ' \t' + this.game.getLocation(this.move.x, this.move.y).toString()
                : '' )
            + ' \t' + (this instanceof MaxNode ? 'MaxNode' : 'MinNode')
            + ' ' + this.children.map(node => node.value)
            + '\n' + this.game.toString();
    }

    /**
     * Create a child depending on this node being a Max or Min node
     */
    private createChild(location: Location): Node {
        if (this instanceof MaxNode) {
            return new MinNode(this.game, this.player, location, this.depth + 1);
        }
        else {
            return new MaxNode(this.game, this.player, location, this.depth + 1);
        }
    }

    /**
     * Generate children of this node
     */
    private generateChildren() {
        if (this.game.hasEnded()) return;

        const freeLocations = this.game.freeLocations();
        for (const location of freeLocations) {
            const node = this.createChild(location);
            this._children.push(node);
            if (this instanceof MaxNode && this.value > 0 || this instanceof MinNode && this.value < 0) {
                break;
            }
        }
    }

    /**
     * Evaluate the value in a leaf node
     */
    protected leafEvaluate(): number | undefined {
        if (this.game.hasEnded()) {
            if (this.game.winner === this.player) return 1;
            else if (this.game.winner === Player.None) return 0;
            else return -1;
        }

        return;
    }

    /**
     * Evaluate the score of this node
     */
    protected abstract evaluate(): void;
}

// tslint:disable-next-line:max-classes-per-file
class MaxNode extends Node {
    protected evaluate() {
        const v = this.leafEvaluate();
        if (v !== undefined) {
            this._value = v;
        } else {
            this._value = Math.max(...this._children.map(node => node.value)) / 2;
        }
    }
}

// tslint:disable-next-line:max-classes-per-file
class MinNode extends Node {
    protected evaluate() {
        const v = this.leafEvaluate();
        if (v !== undefined) {
            this._value = v;
        } else {
            this._value = Math.min(...this._children.map(node => node.value)) / 2;
        }
    }
}

export { GameTree };
