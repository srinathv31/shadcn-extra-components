import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Customer from "@/lib/db/mongo/customer";

export const POST = async () => {
  try {
    // MongoDB connection - replace with your MongoDB URI
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/merchant";
    if (!mongoose.connection.readyState) {
      await mongoose.connect(mongoUri);
    }

    // Generate 500 dummy customers
    const customers = Array.from({ length: 500 }, () => ({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      created: faker.date.past(2), // Past 2 years
      status: faker.helpers.arrayElement(["active", "inactive", "pending"]),
      mailing_list: faker.datatype.boolean(),
      premium: faker.datatype.boolean(),
      product: faker.commerce.productName(),
      notes: faker.lorem.sentence(),
      promo_code: faker.datatype.number({ min: 1000, max: 9999 }),
    }));

    // Insert the customers into the MongoDB collection
    await Customer.insertMany(customers);

    // Return success response
    return NextResponse.json(
      { message: "500 dummy customers inserted successfully." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error inserting dummy customers:", error);
    return NextResponse.json(
      { message: "Error inserting dummy customers", error: error.message },
      { status: 500 },
    );
  } finally {
    // Close the connection if it's open
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
  }
};
