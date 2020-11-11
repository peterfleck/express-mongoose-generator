import mongoose from 'mongoose';

const {schemaName} = new mongoose.Schema({fields}, {timestamps: true});

export default mongoose.model('{modelName}', {schemaName});
