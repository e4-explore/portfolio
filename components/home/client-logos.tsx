import Image from "next/image";
import { cn } from "@/lib/utils";

const clients = [
  { name: "Demandwell", logo: "/assets/clients/demandwell.svg" },
  { name: "Pillar", logo: "/assets/clients/pillar.svg" },
  { name: "Upperhand", logo: "/assets/clients/upperhand.svg" },
  { name: "Apex", logo: "/assets/clients/apex.svg" },
  { name: "Colaboratory", logo: "/assets/clients/colaboratory.svg" },
  { name: "High Alpha", logo: "/assets/clients/high-alpha.svg" },
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
        <div key={client.name} className="h-6 md:h-8 flex items-center">
          <Image
            src={client.logo || "/placeholder.svg"}
            alt={client.name}
            width={160}
            height={48}
            className={cn(
              "h-6 md:h-8 w-auto object-contain",
              // Light mode: grey -> original on hover
              "grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
              // Dark mode: dark-grey -> brighter on hover (+ make black marks white)
              "dark:invert dark:brightness-0 dark:opacity-60 dark:hover:opacity-100"
            )}
          />
        </div>
      ))}
    </div>
  );
}
