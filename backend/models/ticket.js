import mongoose from "mongoose";

const STATUS_VALUES = ["TODO", "IN_PROGRESS", "CLOSED", "BLOCKED"];
const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: "TODO", enum: STATUS_VALUES },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  helpfulNotes: String,
  priority: String,
  deadline: { type: Date, default: null },
  relatedSkills: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Ticket", ticketSchema);
