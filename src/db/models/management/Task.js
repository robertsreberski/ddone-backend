import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
	title: Schema.Types.String,
	time: Schema.Types.Number,
	tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
	notes: Schema.Types.String,
	date: Schema.Types.Date,
	deadline: Schema.Types.Date,
	completed: Schema.Types.Boolean,
	archived: Schema.Types.Boolean,
})

export default mongoose.model('Task', schema)
