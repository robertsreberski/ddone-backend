import mongoose from 'mongoose'

const DB_URL = 'localhost:27017/ddone-development?replicaSet=rs0'

export default () =>
	mongoose.connect(
		`mongodb://${DB_URL}`,
		{ useNewUrlParser: true },
		async () => await mongoose.connection.dropDatabase()
	)
