import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobTitle: { type: String, required: true },
  company: { type: String },
  riskScore: { type: Number, required: true },
  flags: [{ type: String }],
  reportReason: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Report', reportSchema);
