import * as React from 'react';
import { CSSProperties } from 'react';
import GameController from '../game/GameController';
import Location from '../game/Location';
import Player from '../game/Player';
import * as styles from './TicTacToeGrid.scss';

export default class TicTacToeGrid extends React.Component {

    private game: GameController = new GameController();

    constructor(props: any) {
        super(props);
        this.state = {
            grid: this.game.grid,
        };
    }

    /**
     * @returns The CSS styling for containing the coordinates for a player token
     */
    private getCoordinates(x: number, y: number): CSSProperties {
        return {
            gridColumnStart: x,
            gridRowStart: y,
            zIndex: 2
        };
    }

    /**
     * @returns A HTML representation of a player token (a nought or a cross)
     */
    private playerToken(x: number, y: number, type: Player) {
        return (
            <div
                id={`${x}-${y}`}
                key={`${x}-${y}`}
                style={this.getCoordinates(x, y)}
            >{type}</div>
        );
    }

    /**
     * Generate the noughts and crosses on the game grid
     */
    private generateNoughtsAndCrosses() {
        const tokens: any[] = [];
        this.game.grid.forEach((row, y) => {
            row.map((cell, x) => {
                tokens.push(this.playerToken(x + 1, y + 1, cell));
            });
        });

        return tokens;
    }

    public makeMove = (event: React.MouseEvent<HTMLSpanElement>) => {
        const span: any = event.target;
        const location: Location = JSON.parse(span.id);

        this.game.makeMove(location);
        this.forceUpdate();
    }

    private reset = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.game.reset();
        this.forceUpdate();
    }

    public render() {
        return (
            <div className={styles.container} >
                <h1>Turn: {this.game.currentPlayer}</h1>
                {this.game.hasEnded() ? <h2>Game Over</h2> : ''}
                <div className={styles.gameContainer}>
                    <div className={styles.gameOverlay}>
                        <span className={styles.cell} id={JSON.stringify({ x: 0, y: 0 })} onClick={this.makeMove} />
                        <span className={styles.cell} id={JSON.stringify({ x: 1, y: 0 })} onClick={this.makeMove} />
                        <span className={styles.cell} id={JSON.stringify({ x: 2, y: 0 })} onClick={this.makeMove} />
                        <span className={styles.cell} id={JSON.stringify({ x: 0, y: 1 })} onClick={this.makeMove} />
                        <span className={styles.cell} id={JSON.stringify({ x: 1, y: 1 })} onClick={this.makeMove} />
                        <span className={styles.cell} id={JSON.stringify({ x: 2, y: 1 })} onClick={this.makeMove} />
                        <span className={styles.cell} id={JSON.stringify({ x: 0, y: 2 })} onClick={this.makeMove} />
                        <span className={styles.cell} id={JSON.stringify({ x: 1, y: 2 })} onClick={this.makeMove} />
                        <span className={styles.cell} id={JSON.stringify({ x: 2, y: 2 })} onClick={this.makeMove} />
                    </div>
                    <div className={styles.gameGrid} >
                        {this.generateNoughtsAndCrosses()}
                    </div>
                </div>
                <div className={styles.buttonContainer} >
                    <button
                        onClick={this.reset}
                    >
                        Reset
                    </button>
                </div>
            </div>
        );
    }
}
