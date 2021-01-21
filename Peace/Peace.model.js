import mongoose from "mongoose";

const { Schema, ObjectId, model } = mongoose;

const PeaceSchema = new Schema({
	AString : {
type: String,
required: true,
unique: true,
},
	ANumber : {
type: Number,
}
}, {timestamps: true});

export default model('Peace', PeaceSchema);
