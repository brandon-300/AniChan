
import mongoose from 'mongoose';

// Type-only: models carry custom statics/methods and loosely-typed docs (migrated from JS).
type AnyModel = mongoose.Model<any> & Record<string, any>;
const SentPinSchema = new mongoose.Schema({
  chatId: { type: String, required: true },
  pinId: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
});

// One chat can't have the same pin recorded twice
SentPinSchema.index({ chatId: 1, pinId: 1 }, { unique: true });

export default mongoose.model('SentPin', SentPinSchema) as AnyModel;
