import Image from "next/image";
import { cn } from "@/lib/utils";

const clients = [
  {
    name: "Demandwell",
    lightLogo: "/clients/demandwell - light mode.svg",
    darkLogo: "/clients/demandwell - dark mode.svg",
    height: 24,
    heightClassName: "h-6",
  },
  { name: "Pillar", lightLogo: "/clients/pillar.svg", darkLogo: "/clients/pillar.svg", height: 32, heightClassName: "h-8" },
  {
    name: "Upperhand",
    lightLogo: "/clients/upperhand - light mode.svg",
    darkLogo: "/clients/upperhand - dark mode.svg",
    height: 40,
    heightClassName: "h-10",
  },
  { name: "Apex", lightLogo: "/clients/apex - light mode.svg", darkLogo: "/clients/apex - dark mode.svg", height: 40, heightClassName: "h-10" },
  {
    name: "Colaboratory",
    lightLogo: "/clients/colaboratory - light mode.svg",
    darkLogo: "/clients/colaboratory - dark mode.svg",
    height: 32,
    heightClassName: "h-8",
  },
  {
    name: "High Alpha",
    lightLogo: "/clients/high-alpha - light mode.svg",
    darkLogo: "/clients/high-alpha - dark mode.svg",
    height: 32,
    heightClassName: "h-8",
  },
];

interface ClientLogosProps {
  className?: string;
}

export function ClientLogos({ className }: ClientLogosProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-12",
        className
      )}
    >
      {clients.map((client) => (
        <div key={client.name} className={cn("flex items-center", client.heightClassName)}>
          <Image
            src={client.lightLogo || "/placeholder.svg"}
            alt={client.name}
            width={240}
            height={client.height}
            className={cn(
              client.heightClassName,
              "w-auto object-contain",
              // Light mode: grey -> original on hover
              "grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
              "dark:hidden"
            )}
          />
          <Image
            src={client.darkLogo || "/placeholder.svg"}
            alt={client.name}
            width={240}
            height={client.height}
            className={cn(
              client.heightClassName,
              "w-auto object-contain",
              "grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
              "hidden dark:block"
            )}
          />
        </div>
      ))}
    </div>
  );
}
