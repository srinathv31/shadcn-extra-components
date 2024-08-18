import { Modal } from "@/components/Modal";
import { getCarById } from "@/lib/db/cars";

export default async function CarsModal({
  params,
}: {
  params: { [key: string]: string | undefined };
}) {
  const id = params.id;

  if (!id) {
    return <h1 className="text-center">No Car Found for that ID.</h1>;
  }

  const car = await getCarById(id);

  return (
    <Modal>
      <div className="flex flex-col justify-center items-center overflow-scroll m-10">
        <h1>Car {id}</h1>
        <p>
          {car.year} {car.make} - {car.model}
        </p>
        <p>{car.color}</p>
      </div>
    </Modal>
  );
}
