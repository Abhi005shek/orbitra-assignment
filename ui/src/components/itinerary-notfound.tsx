import { MapPinned } from "lucide-react";
import type { ReactNode } from "react";

export default function NotFoundItinerary({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <div className="flex min-h-[70vh] shadow-sm flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 px-6 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <MapPinned className="h-8 w-8 text-primary" />
      </div>

      <h2 className="text-2xl font-semibold">Itinerary Not Found</h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        The itinerary you're looking for doesn't exist, may have been deleted,
        or the shared link is invalid.
      </p>

      {children}
    </div>
  );
}
