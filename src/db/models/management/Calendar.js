import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
	entries: [{ type: Schema.Types.ObjectId, ref: 'TimeEntry' }],
	tasks: { type: Schema.Types.ObjectId, ref: 'Container' },
})

export default mongoose.model('Calendar', schema)
