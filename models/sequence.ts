import mongoose, { Schema, Document } from 'mongoose';

export interface ISequence extends Document {
  name: string;
  seq: number;
}

const sequenceSchema: Schema = new Schema({
  name: String,
  seq: Number
});

const Sequence = mongoose.model<ISequence>('Sequence', sequenceSchema);

export default Sequence;
