import mongoose, { Schema, Document } from 'mongoose';

export interface ILocation extends Document {
  latitude: number;
  longitude: number;
  timestamp: Date;
  userAgent?: string;
}

const LocationSchema: Schema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  userAgent: { type: String },
});

// Prevent overwriting the model if it's already compiled
export default mongoose.models.Location || mongoose.model<ILocation>('Location', LocationSchema);
