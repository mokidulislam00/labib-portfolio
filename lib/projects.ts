const basePath =
  process.env.NODE_ENV === "production"
    ? "/labib-portfolio"
    : "";
export type Project = {
  slug: string;
  number: string;
  name: string;
  type: string;
  year: string;
  image: string;
  description: string;
  overview: string;
  technologies: string[];
  features: string[];
};

export const projects: Project[] = [
  {
    slug: "contact-manager",
    number: "01",
    name: "Contact Manager",
    type: "FULL-STACK DEVELOPMENT",
    year: "2026",
    image: `${basePath}/projects/project-1.jpg`,
    description:
      "A simple and modern application for managing contacts.",
    overview:
      "Contact Manager is a full-stack web application designed to make contact management easier. Users can add, view, edit, delete and search contacts through a clean interface.",
    technologies: [
      "Next.js",
      "React",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
    ],
    features: [
      "Create and manage contacts",
      "Search contacts by name",
      "Edit and delete contact records",
      "Responsive user interface",
      "MongoDB database integration",
    ],
  },
  {
    slug: "inventory-management",
    number: "02",
    name: "Inventory Management",
    type: "WEB APPLICATION",
    year: "2026",
    image: `${basePath}/projects/project-2.jpg`,
    description:
      "A modern dashboard for managing products and inventory.",
    overview:
      "Inventory Management is a web application concept focused on helping businesses organize products, monitor inventory and manage day-to-day operations from one place.",
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "MongoDB",
    ],
    features: [
      "Product management",
      "Inventory overview dashboard",
      "Organized product information",
      "Responsive dashboard layout",
      "Scalable application structure",
    ],
  },
  {
    slug: "creative-portfolio",
    number: "03",
    name: "Creative Portfolio",
    type: "WEB DESIGN / DEVELOPMENT",
    year: "2026",
    image: `${basePath}/projects/project-3.jpg`,
    description:
      "A minimal portfolio with thoughtful interactions and motion.",
    overview:
      "Creative Portfolio is a personal portfolio experience built around typography, clean layouts and subtle motion. It showcases projects, development skills and contact information.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
    ],
    features: [
      "Responsive portfolio layout",
      "Animated project showcase",
      "Dedicated project detail pages",
      "Smooth scroll interactions",
      "Contact section",
    ],
  },
];
