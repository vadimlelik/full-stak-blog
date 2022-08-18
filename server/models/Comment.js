import mongoose from 'mongoose';

const СommentSchema = mongoose.Schema({
	commetn: { type: String, required: true },
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},
	{ timestamps: true }
)



export default mongoose.model('Comment', СommentSchema)