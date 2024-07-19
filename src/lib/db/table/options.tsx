import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const energies = [
  {
    value: "Low",
    label: "Low",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "Medium",
    label: "Medium",
    icon: CircleIcon,
  },
  {
    value: "High",
    label: "High",
    icon: StopwatchIcon,
  },
];

export const statuses = [
  {
    label: "No",
    value: false,
    icon: ArrowDownIcon,
  },
  {
    label: "Yes",
    value: true,
    icon: ArrowRightIcon,
  },
];
