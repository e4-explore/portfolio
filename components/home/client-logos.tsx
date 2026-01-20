import Image from "next/image";
import { cn } from "@/lib/utils";

const clients = [
  { name: "Demandwell", logo: "/assets/clients/demandwell.svg" },
  { name: "Pillar", logo: "/assets/clients/pillar.svg" },
  { name: "Upperhand", logo: "/assets/clients/upperhand.svg" },
  { name: "Apex", logo: "/assets/clients/apex.svg" },
  { name: "Colaboratory", logo: "/assets/clients/colaboratory.svg" },
];

interface ClientLogosProps {
  className?: string;
}

export function ClientLogos({ className }: ClientLogosProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-8 md:gap-12", className)}>
      {clients.map((client) => (
        <div
          key={client.name}
          className="relative h-8 w-24 md:h-10 md:w-28 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
        >
          <Image
            src={client.logo || "/placeholder.svg"}
            alt={client.name}
            fill
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}
