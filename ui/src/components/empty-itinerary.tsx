import { MapPinned, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function EmptyItineraries() {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 px-6 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <MapPinned className="h-8 w-8 text-primary" />
      </div>

      <h2 className="text-2xl font-semibold">No itineraries yet</h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Upload a travel document such as a flight ticket, hotel booking, or
        train ticket and let AI generate your personalized travel itinerary.
      </p>

      <Button asChild className="mt-6">
        <Link to="/upload">
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Link>
      </Button>
    </div>
  );
}
