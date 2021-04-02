import mongoose from 'mongoose'

class Database {
  constructor () {
    this.mongoConnect()
  }

  private mongoConnect () {
    const strConnection = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.ejos5.gcp.mongodb.net/dd_base?retryWrites=true&w=majority`
    mongoose.connect(strConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  }
}
export default Database
