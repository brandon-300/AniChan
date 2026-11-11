
import mongoose from 'mongoose';

// Type-only: models carry custom statics/methods and loosely-typed docs (migrated from JS).
type AnyModel = mongoose.Model<any> & Record<string, any>;
const SentWallpaperSchema = new mongoose.Schema({
  chatId: { type: String, required: true },
  wallpaperId: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
});

// One chat can't have the same wallpaper recorded twice
SentWallpaperSchema.index({ chatId: 1, wallpaperId: 1 }, { unique: true });

export default mongoose.model('SentWallpaper', SentWallpaperSchema) as AnyModel;
