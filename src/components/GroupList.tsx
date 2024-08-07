import { db } from "@/lib/db/mongo/db";
import { IGroup } from "@/lib/db/mongo/group";

const { Group } = db;

async function getGroups() {
  return await Group.find<IGroup>({});
}

export default async function GroupList() {
  const groups = await getGroups();

  return (
    <div>
      {groups.map((group) => (
        <div key={group._id} className="border p-3 m-2 rounded bg-white">
          <p>{group.name}</p>
        </div>
      ))}
    </div>
  );
}
