/**
 * Represents a location in the game
 */
export default class Location {

    private _x : number;
    public get x() : number {
        return this._x;
    }
    public set x(v : number) {
        this._x = v;
    }

    private _y : number;
    public get y() : number {
        return this._y;
    }
    public set y(v : number) {
        this._y = v;
    }

    constructor(x: number = 0, y: number = 0) {
        this._x = x;
        this._y = y;
    }

    public toString() {
        return `(${this.x}, ${this.y})`;
    }
}
