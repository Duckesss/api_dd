export interface Dice{
    faces : number,
    rolls : number,
    critical ?: number
}

export interface ClientEvents{
    "diceRoll": () => Promise<Number>;
}

export interface ServerEvents{
    "diceRoll": (dice : Dice) => void;
}

export interface Event{
    [key : string] : (params: any, callback: () => any) => any
}