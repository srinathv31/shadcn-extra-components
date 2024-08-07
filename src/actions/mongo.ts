"use server";

import { db } from "@/lib/db/mongo/db";
import { IGroup } from "@/lib/db/mongo/group";
import { revalidatePath } from "next/cache";

const { Group, Customer } = db;

export async function createGroup(formData: FormData) {
  const name = formData.get("name") as string;

  return await Group.create<IGroup>({
    name,
    tests: ["test1", "test2"],
    created: new Date(),
  })
    .then((group) => console.log(group))
    .catch((error) => console.error(error))
    .finally(() => {
      console.log("done");
      revalidatePath("/groups");
    });
}

export async function insertCustomer(customer: ) {

}
