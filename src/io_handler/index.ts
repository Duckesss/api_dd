import { Server, Socket } from 'socket.io'
import { Server as CreateServer } from "http";
import { createIoEvents } from "./events/events";
class Io{
    private io
    constructor(httpServer: CreateServer){
        this.io = new Server(httpServer,{
            cors:{
                origin: "*"
            }
        })
        this.handleEvents()
    }

    private handleEvents(){
        this.io.on("connection", (socket: Socket) => {
            const events = createIoEvents()
            Object.entries(events).forEach(([evtName,action]) => {
                socket.on(evtName, action)
            })
        });
    }
}

export default Io

