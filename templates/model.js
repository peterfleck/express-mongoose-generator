import mongoose from "mongoose";

const { Schema, ObjectId, model } = mongoose;

const {schemaName} = new Schema({fields}, {timestamps: true});

export default model('{modelName}', {schemaName});
