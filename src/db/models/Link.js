import mongoose, { Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const linkSchema = new Schema({
	_id: { type: String, default: uuidv4 },
	url: String,
	description: String,
})

export default mongoose.model('Link', linkSchema)
