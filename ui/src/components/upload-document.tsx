import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_API_URL!;

export default function UploadCard() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];

      const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
      const maxSize = 10 * 1024 * 1024; // 10mb

      if (!allowedTypes.includes(droppedFile.type)) {
        alert("Invalid file format! Please upload PDF, PNG or JPG.");
        return;
      }

      if (droppedFile.size > maxSize) {
        alert("File size exceeds 10 MB limit.");
        return;
      }

      setFile(droppedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${BASE_URL}/api/document/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Server error during file transmission.");
      }

      await response.json();
      toast.success("Document uploaded successfully!");
      clearFile();
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("Failed to upload file. Please try again.");
    } finally {
      setIsSubmitting(false);
      navigate("/itineraries");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="sm:w-[80%] lg:w-[60%] border-zinc-400">
        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col items-center gap-6 py-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Upload className="h-8 w-8 text-primary" />
            </div>

            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold">Upload Travel Document</h2>
              <p className="max-w-md text-sm text-muted-foreground">
                Upload a flight ticket, hotel booking, train ticket, or any
                travel document and let AI generate a personalized itinerary for
                you.
              </p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
            />

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex w-full max-w-xl flex-col items-center gap-4 rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5 scale-[1.01]"
                  : "border-zinc-300 hover:bg-muted/40"
              }`}
            >
              <FileText
                className={`h-10 w-10 ${isDragging ? "text-primary" : "text-muted-foreground"}`}
              />

              {!file ? (
                <>
                  <div>
                    <p className="font-medium">
                      Drag & drop your document here
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      PDF, PNG or JPG up to 10 MB
                    </p>
                  </div>
                  <Button type="button" onClick={handleButtonClick}>
                    Choose File
                  </Button>
                </>
              ) : (
                <div className="w-full flex items-center justify-between gap-4 bg-muted/60 p-3 rounded-lg border">
                  <div className="flex items-center gap-3 overflow-hidden text-left">
                    <div className="text-sm font-medium truncate max-w-xs sm:max-w-md">
                      {file.name}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={clearFile}
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {file && (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full max-w-xl mt-2 py-1 transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing with AI...
                  </>
                ) : (
                  "Submit Document"
                )}
              </Button>
            )}

            <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-muted px-3 py-1">
                Flight Tickets
              </span>
              <span className="rounded-full bg-muted px-3 py-1">
                Hotel Bookings
              </span>
              <span className="rounded-full bg-muted px-3 py-1">
                Train Tickets
              </span>
              <span className="rounded-full bg-muted px-3 py-1">
                Travel Receipts
              </span>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
