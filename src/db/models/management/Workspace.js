import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
	name: Schema.Types.String,
	color: Schema.Types.String,
	projects: [{ type: Schema.Types.ObjectId, ref: 'Container' }],
	archived: Schema.Types.Boolean,
})

export default mongoose.model('Workspace', schema)
