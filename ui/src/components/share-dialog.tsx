import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import { useParams } from "react-router";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_API_URL!;

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shareId: string;
  itineraryId?: string;
  setLinkGenerated?: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export default function ShareDialog({
  open,
  onOpenChange,
  shareId,
  itineraryId = "",
  setLinkGenerated,
}: ShareDialogProps) {
  const [shareLink, setShareLink] = useState("");
  const [loading, setLoading] = useState(false);

  const token = useAuthStore((state) => state.token);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (shareId) {
      setShareLink(`${window.location.origin}/share/${shareId}`);
    } else {
      setShareLink("");
    }
  }, [shareId]);

  const handleGenerateLink = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${BASE_URL}/api/itinerary/${id ?? itineraryId}/share`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to generate share link");
      }

      const result = await response.json();

      setShareLink(`${window.location.origin}/share/${result.data.shareId}`);
      setLinkGenerated((prev) => !prev);
      toast.success("Share link generated");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in generating share link");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open && !shareId) {
          setShareLink("");
        }

        onOpenChange(open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Itinerary</DialogTitle>

          <DialogDescription>
            Generate a public link for this itinerary.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={shareLink}
            readOnly
            placeholder="No link generated yet"
          />

          {shareLink ? (
            <Button onClick={handleCopy} className="w-full">
              Copy Link
            </Button>
          ) : (
            <Button
              onClick={handleGenerateLink}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Generating..." : "Generate Link"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
