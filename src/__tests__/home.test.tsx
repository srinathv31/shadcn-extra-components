import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import DogTableClient from "@/components/DogTableClient";
import { Dog } from "@/interfaces/Dog";
import { getDogs } from "@/lib/db/dogs";
import Home from "@/app/page";
import { use } from "react";

// Sample data
const sampleDogs: Dog[] = [
  {
    id: "1",
    name: "Fido",
    breed: "Labrador",
    age: 5,
    last_checkup_date: "2023-06-01",
    weight: 0,
    profile_picture: "",
    energy_level: "Low",
    owner_name: "",
    owner_contact: "",
    vaccination_status: false,
    microchip_id: "",
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    name: "Spot",
    breed: "Dalmatian",
    age: 3,
    last_checkup_date: "2023-05-15",
    weight: 0,
    profile_picture: "",
    energy_level: "Low",
    owner_name: "",
    owner_contact: "",
    vaccination_status: false,
    microchip_id: "",
    created_at: "",
    updated_at: "",
  },
];

// Mock getDogs to avoid database connection
jest.mock("../lib/db/dogs", () => ({
  getDogs: jest.fn(),
}));

// Mock the use hook
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  use: jest.fn(),
}));

describe("Home Page", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  it("renders the heading and the dog table", async () => {
    // Mock the implementation to return sample dogs
    (getDogs as jest.Mock).mockResolvedValue(sampleDogs);
    (use as jest.Mock).mockReturnValue(sampleDogs);

    render(<Home />);

    // Wait for the AsyncDogTable to render the dogs data
    await waitFor(() => {
      const firstDogName = screen.getByText("Fido");
      const secondDogName = screen.getByText("Spot");
      expect(firstDogName).toBeInTheDocument();
      expect(secondDogName).toBeInTheDocument();
    });

    // Verify that the use hook was called
    expect(use).toHaveBeenCalled();
  });
});
