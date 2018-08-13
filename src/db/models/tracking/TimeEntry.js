import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
	intervals: [{ type: Schema.Types.ObjectId, ref: 'Interval' }],
	tasks: {
		working: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
		completed: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
	},
	completed: Schema.Types.Boolean,
	abandoned: Schema.Types.Boolean,
})

export default mongoose.model('TimeEntry', schema)
