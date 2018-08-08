import mongoose, { Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const userSchema = new Schema({

})

export default mongoose.model('User', userSchema)