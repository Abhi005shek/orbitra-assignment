import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Calendar, MapPin, FileText, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DocumentViewerDialog from "./document-dialog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import NotFoundItinerary from "./itinerary-notfound";

const BASE_URL = import.meta.env.VITE_API_URL!;

interface ItineraryData {
  shareId: string;
  document: {
    originalName: string;
    mimeType: string;
    fileUrl: string;
  };
  title: string;
  destination: string;
  createdAt: string;
  content: string;
}

function SharedItineraryById() {
  const token = useAuthStore((state) => state.token);
  const { id } = useParams<{ id: string }>();
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null);
  const navigate = useNavigate();
  const [isPreview, setIsPreview] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/itinerary/share/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error occured in fetching shared itinerary.");
        }

        const result = await response.json();
        setItinerary(result.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  if (loading) {
    return (
      <div className="h-[90vh] flex items-center justify-center">
        Loading itinerary...
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="h-screen flex items-center justify-center">
        <NotFoundItinerary />
      </div>
    );
  }

  return (
    <>
      <DocumentViewerDialog
        open={isPreview}
        onOpenChange={() => setIsPreview(false)}
        document={itinerary.document}
      />
      <div className="mx-auto max-w-5xl space-y-6 p-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl">{itinerary.title}</CardTitle>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {itinerary.destination}
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(itinerary.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => navigate(-1)}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Source Document</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <div className="flex justify-between w-full items-center">
                <span>{itinerary.document?.originalName}</span>

                <Button onClick={() => setIsPreview(true)}>View</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI Generated Itinerary</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap leading-8">
                <article className="prose prose-zinc dark:prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {itinerary.content}
                  </ReactMarkdown>
                </article>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default SharedItineraryById;
