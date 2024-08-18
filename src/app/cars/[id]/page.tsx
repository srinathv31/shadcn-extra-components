import { getCarById } from "@/lib/db/cars";

export default async function CarsPage({
  params,
}: {
  params: { [key: string]: string | undefined };
}) {
  const id = params.id;

  if (!id) {
    return <h1>No Car Found for that ID.</h1>;
  }

  const car = await getCarById(id);

  return (
    <div className="flex flex-col justify-center items-center overflow-scroll m-10">
      <h1>Car {id}</h1>
      <p>{car.color}</p>
    </div>
  );
}
