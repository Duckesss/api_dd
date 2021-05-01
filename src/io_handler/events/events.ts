import { Dice, Event } from "./types";
import Utils from "../../Utils";

export function createIoEvents() : Event {
    return {
        diceRoll: (payload : Dice, callback: (number) => any) => {
            const {faces, rolls, critical} = payload
            const acertos = Utils.roll(faces, rolls, critical)
            callback(acertos)
        }
    }
}