import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  hardwareId: String,
  installationDate: Date,
  serviceDueDate: Date,
  companyName: String,
  companyAddress: String,
  companyGST: String,
  contactNumber: String,
}, { timestamps: true });

export default mongoose.models.Client || mongoose.model('Client', ClientSchema);