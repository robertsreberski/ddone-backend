import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
	start: Schema.Types.Number,
	end: Schema.Types.Number,
})

export default mongoose.model('Interval', schema)
