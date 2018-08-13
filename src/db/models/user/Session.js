import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
	device: Schema.Types.String,
	ip: Schema.Types.String,
	start: Schema.Types.Date,
	end: Schema.Types.Date,
})

export default mongoose.model('Session', schema)
