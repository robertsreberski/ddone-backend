import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
	name: Schema.Types.String,
	color: Schema.Types.String,
	archived: Schema.Types.Boolean,
})

export default mongoose.model('Tag', schema)
