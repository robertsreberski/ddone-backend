import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
	active: Schema.Types.Boolean,
	runningEntry: { type: Schema.Types.ObjectId, ref: 'TimeEntry' },
})

export default mongoose.model('Timer', schema)
