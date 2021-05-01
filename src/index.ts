import app from './app'
import * as appInfo from '../package.json'
const PORT = 5000
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import Io from "./io_handler"

const httpServer = createServer(app);

const io = new Io(httpServer)


httpServer.listen(PORT, () => {
  console.log(`[${appInfo.version}] [${new Date().toLocaleString('pt-br')}] Server running on localhost:${PORT}`)
})
