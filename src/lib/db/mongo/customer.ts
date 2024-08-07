// lib/db/mongo/models/group.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface ICustomer {
  _id: string;
  name: string;
  email?: string;
  created: Date;
  status: "active" | "inactive" | "pending";
  mailing_list: boolean;
  premium: boolean;
  product: string;
  notes?: string;
  promo_code: number;
}

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    created: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "pending",
    },
    mailing_list: { type: Boolean, default: true },
    premium: { type: Boolean, default: false },
    product: { type: String, required: true },
    notes: { type: String },
  },
  {
    timestamps: true,
  },
);

const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
