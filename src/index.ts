import * as dotenv from 'dotenv'
dotenv.config({
  path: './.env'
})
import app from './app'
import * as appInfo from '../package.json'
const PORT = process.env.PORT || 5000
import { createServer } from "http";
import { Server } from "socket.io";
import ioHandler from "./controllers/IoController";


const httpServer = createServer(app);
const io = new Server(httpServer,{
  cors: {
    origin: "*"
  }
})

io.on('connection', socket => new ioHandler(socket))

httpServer.listen(PORT, () => {
  console.log(`[${appInfo.version}] [${new Date().toLocaleString('pt-br')}] Server running on localhost:${PORT}`)
})
