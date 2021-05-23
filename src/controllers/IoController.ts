import { Socket } from "socket.io";

class ioEvents {
    private socket : Socket
    constructor(socket : Socket){
        this.socket = socket
        this.event("ping")
        this.event("roll")
    }
    private event(eventName){
        const self = this
        self.socket.on(eventName, data => {
            self.socket.broadcast.emit(eventName, data)
        })
    }
}

class ioHandler{
    private socket : Socket
    private events : ioEvents
    constructor(socket : Socket){
        this.socket = socket
        this.events = new ioEvents(this.socket)
    }
}

export default ioHandler