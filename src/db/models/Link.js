import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
	url: Schema.Types.String,
	description: Schema.Types.String,
})

export default mongoose.model('Link', schema)
