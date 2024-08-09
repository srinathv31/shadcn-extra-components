interface CarMake {
  id: string;
  name: string;
}

interface CarModel {
  id: number;
  make: string;
  name: string;
  year: number;
}

export const carMakes: CarMake[] = [
  { id: "1", name: "Toyota" },
  { id: "2", name: "Ford" },
  { id: "3", name: "Chevrolet" },
  { id: "4", name: "Honda" },
  { id: "5", name: "BMW" },
  { id: "6", name: "Audi" },
  { id: "7", name: "Mercedes-Benz" },
  { id: "8", name: "Volkswagen" },
  { id: "9", name: "Nissan" },
  { id: "10", name: "Hyundai" },
];

export const carModelMap: Record<string, CarModel[]> = {
  "1": [
    { id: 1, make: "Toyota", name: "Corolla", year: 2021 },
    { id: 2, make: "Toyota", name: "Camry", year: 2021 },
    { id: 3, make: "Toyota", name: "RAV4", year: 2021 },
    { id: 4, make: "Toyota", name: "Highlander", year: 2021 },
    { id: 5, make: "Toyota", name: "Sienna", year: 2021 },
  ],
  "2": [
    { id: 6, make: "Ford", name: "F-150", year: 2021 },
    { id: 8, make: "Ford", name: "Explorer", year: 2021 },
    { id: 10, make: "Ford", name: "Ranger", year: 2021 },
  ],
  "3": [
    { id: 11, make: "Chevrolet", name: "Silverado", year: 2021 },
    { id: 13, make: "Chevrolet", name: "Traverse", year: 2021 },
    { id: 14, make: "Chevrolet", name: "Tahoe", year: 2021 },
    { id: 15, make: "Chevrolet", name: "Suburban", year: 2021 },
  ],
  "4": [
    { id: 16, make: "Honda", name: "Civic", year: 2021 },
    { id: 17, make: "Honda", name: "Accord", year: 2021 },
    { id: 18, make: "Honda", name: "CR-V", year: 2021 },
    { id: 19, make: "Honda", name: "Pilot", year: 2021 },
    { id: 20, make: "Honda", name: "Odyssey", year: 2021 },
  ],
  "5": [
    { id: 21, make: "BMW", name: "3 Series", year: 2021 },
    { id: 22, make: "BMW", name: "5 Series", year: 2021 },
    { id: 23, make: "BMW", name: "7 Series", year: 2021 },
    { id: 24, make: "BMW", name: "X3", year: 2021 },
    { id: 25, make: "BMW", name: "X5", year: 2021 },
  ],
  "6": [
    { id: 26, make: "Audi", name: "A3", year: 2021 },
    { id: 27, make: "Audi", name: "A4", year: 2021 },
    { id: 28, make: "Audi", name: "A6", year: 2021 },
    { id: 29, make: "Audi", name: "Q3", year: 2021 },
    { id: 30, make: "Audi", name: "Q5", year: 2021 },
  ],
  "7": [
    { id: 34, make: "Mercedes-Benz", name: "GLC", year: 2021 },
    { id: 35, make: "Mercedes-Benz", name: "GLE", year: 2021 },
  ],
  "8": [{ id: 36, make: "Volkswagen", name: "Jetta", year: 2021 }],
  "9": [
    { id: 43, make: "Nissan", name: "Rogue", year: 2021 },
    { id: 44, make: "Nissan", name: "Pathfinder", year: 2021 },
    { id: 45, make: "Nissan", name: "Armada", year: 2021 },
  ],
  "10": [
    { id: 46, make: "Hyundai", name: "Elantra", year: 2021 },
    { id: 47, make: "Hyundai", name: "Sonata", year: 2021 },
  ],
};
