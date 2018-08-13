import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
	name: Schema.Types.String,
	start: Schema.Types.Date,
	end: Schema.Types.Date,
})

export default mongoose.model('Status', schema)
