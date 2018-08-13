import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
	_id: Schema.Types.String,
	statuses: [{ type: Schema.Types.ObjectId, ref: 'Status' }],
	sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }],
	workspaces: [{ type: Schema.Types.ObjectId, ref: 'Workspace' }],
	calendar: [{ type: Schema.Types.ObjectId, ref: 'Calendar' }],
	timer: [{ type: Schema.Types.ObjectId, ref: 'Timer' }],
	timeEntries: [{ type: Schema.Types.ObjectId, ref: 'TimeEntry' }],

	disabled: { type: Schema.Types.Boolean, default: false },
})

export default mongoose.model('User', schema)
