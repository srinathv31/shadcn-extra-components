/**
 * @jest-environment node
 */

import { ICustomer } from "@/lib/db/mongo/customer";
import mongoose from "mongoose";
import { db } from "@/lib/db/mongo/db";

const { Customer } = db;

describe("Customer Model Test", () => {
  it("creates and saves a user successfully", async () => {
    const validCustomer = new Customer({
      name: "John Doe",
      email: "john@gmail.com",
      status: "active",
      mailing_list: true,
      premium: false,
      product: "tv",
      promo_code: 1234,
    });
    const savedCustomer = await validCustomer.save();

    expect(savedCustomer._id).toBeDefined();
    expect(savedCustomer.name).toBe("John Doe");
    expect(savedCustomer.email).toBe("john@gmail.com");
  });

  it("fails to save a user without required fields", async () => {
    const userWithoutRequiredField: Partial<ICustomer> = { name: "John Doe" };
    let err;
    try {
      await new Customer(userWithoutRequiredField).save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
