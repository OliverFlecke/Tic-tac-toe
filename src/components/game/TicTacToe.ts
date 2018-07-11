import Location from './Location';
import Player from './Player';
import Result from './Result';

export default class TicTacToe {

    private _currentPlayer: Player = Player.Cross;

    private _grid: Player[][] = [
        Array(3).fill(Player.None),
        Array(3).fill(Player.None),
        Array(3).fill(Player.None)
    ];

    /**
     * Creates a deep clone of the TicTacToe object
     * @returns A deep clone of the object
     */
    public clone(): TicTacToe {
        const game = new TicTacToe();

        this.grid.forEach((row, y) => {
            row.forEach((cell, x) => game.setLocation(x, y, cell));
        });
        game._currentPlayer = this._currentPlayer;

        return game;
    }

    /**
     * @returns The game grid
     */
    public get grid() {
        return this._grid;
    }

    /**
     * Resets the game
     */
    public reset() {
        this._grid.forEach((row, y) => {
            row.forEach((_, x) => this.clearLocation(x, y));
        });
        this._currentPlayer = Player.Cross;
    }

    /**
     * Clear the given cell
     * @param x The x-coordinate of the cell to clear
     * @param y The y-coordinate of the cell to clear
     */
    private clearLocation(x: number, y: number) {
        this._grid[y][x] = Player.None;
    }

    /**
     * @param x The x-coordinate to set
     * @param y The y-coordinate to set
     * @param player The player for whom the position should be marked
     */
    private setLocation(x: number, y: number, player: Player) {
        if (this._grid[y][x] === Player.None) {
            this._grid[y][x] = player;
        }
    }

    /**
     * @param x The x-coordinate of the position to get
     * @param y The y-coordinate of the position to get
     * @returns The player token at the given position
     */
    public getLocation(x: number, y: number): Player {
        return this._grid[y][x];
    }

    /**
     * @param x The x-coordinate to do the action
     * @param y The y-coordinate to do the action
     * @param player The player doing the action
     */
    public doAction(x: number, y: number, player: Player = this.currentPlayer) {
        if (this.noMorePossibleMoves()) throw Error('There is no more possible moves. The game has ended');
        if (this._currentPlayer !== player) throw Error('Moves made by players have to alternate');
        if (this.getLocation(x, y) !== Player.None) throw Error('The location is already occupied');

        this._currentPlayer = this.nextPlayer;
        this.setLocation(x, y, player);
    }

    /**
     * @returns The current player of the game
     */
    public get currentPlayer(): Player {
        return this._currentPlayer;
    }

    /**
     * Find the next player to take a turn by alternating the players
     * @returns The next player to take a turn
     */
    public get nextPlayer(): Player {
        return this._currentPlayer === Player.Cross ? Player.Nought : Player.Cross;
    }

    /**
     * @returns The winner, if the player has three in a row horizontally
     */
    private checkRows(): Player | undefined {
        let value;
        for (const key in this.grid) {
            if (this.grid.hasOwnProperty(key)) {
                const line = this.grid[key];
                value = line.reduce((a, b) => a === b ? a : Player.None);
                if (value !== Player.None) {
                    return value;
                }
            }
        }

        return;
    }

    /**
     * @returns The winner, if the player has three in a row vertically
     */
    private checkColumns(): Player | undefined {
        let value;
        for (let x = 0; x < 3; x++) {
            value = this.grid.reduce((a, b) => a[x] === b[x] ? a : Array(3).fill(Player.None));
            if (value[x] !== Player.None) {
                return value[x];
            }
        }

        return;
    }

    /**
     * @returns The winner, if the player has three in a row in the diagonal
     */
    private checkDiagonal(): Player | undefined {
        if (this.getLocation(0, 0) === this.getLocation(1, 1)
            && this.getLocation(1, 1) === this.getLocation(2, 2)) {
            return this.getLocation(1, 1);
        }

        if (this.getLocation(2, 0) === this.getLocation(1, 1)
            && this.getLocation(1, 1) === this.getLocation(0, 2)) {
            return this.getLocation(1, 1);
        }

        return undefined;
    }

    /**
     * @returns The player whom is the winner of the game
     */
    public get winner(): Player {
        return this.checkColumns() ||
            this.checkRows() ||
            this.checkDiagonal() ||
            Player.None;
    }

    /**
     * @returns True if the game has ended
     */
    public hasEnded(): boolean {
        return this.result !== Result.None;
    }

    /**
     * @returns True, if there are no more possible moves
     */
    public noMorePossibleMoves(): boolean {
        return this.grid.every(row => row.every(cell => cell !== Player.None));
    }

    /**
     * @returns The result of the game
     */
    public get result(): Result {
        const winner = this.winner;
        if (winner === Player.Cross) return Result.Crosses;
        if (winner === Player.Nought) return Result.Noughts;

        if (this.noMorePossibleMoves()) return Result.Tie;

        return Result.None;
    }

    /**
     * @returns A string representation of the game
     */
    public toString(): string {
        return this.grid.map(line => line.join('|')).join('\n');
    }

    /**
     * @param game The game to find the free locations in
     * @returns A list of free locations in the given game
     */
    public freeLocations(): Location[] {
        const locations: Location[] = [];

        this.grid.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === Player.None) locations.push(new Location(x, y));
            });
        });

        return locations;
    }
}
