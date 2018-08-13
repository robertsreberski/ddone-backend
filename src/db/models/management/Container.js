import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
	type: Schema.Types.String, /* Calendar | Project */
	name: Schema.Types.String,
	color: Schema.Types.String,
	tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
	archived: Schema.Types.Boolean,
})

export default mongoose.model('Container', schema)
