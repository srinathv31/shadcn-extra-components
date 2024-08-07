// lib/db/mongo/models/group.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IGroup {
  _id: string;
  name: string;
  created: Date;
  tests: string[];
}

const groupSchema = new Schema(
  {
    name: { type: String, required: true },
    created: { type: Date, default: Date.now },
    tests: { type: Array, default: [] },
  },
  {
    timestamps: true,
  },
);

const Group = mongoose.models.Group || mongoose.model("Group", groupSchema);

export default Group;
