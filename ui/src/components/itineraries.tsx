import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Eye, Link2, MoreVertical, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";
import EmptyItineraries from "./empty-itinerary";
import ShareDialog from "./share-dialog";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_API_URL!;

export default function ItineraryTable() {
  const token = useAuthStore((state) => state.token);
  const [itineraries, setItineraries] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [shareId, setShareId] = useState("");
  const [itineraryId, setItineraryId] = useState("");
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/itinerary/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Server error during file transmission.");
        }

        const result = await response.json();
        setItineraries(result.data);
      } catch (error) {
        console.error("Upload Error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [token, linkGenerated]);

  const onView = (id: string) => navigate(`/itineraries/${id}`);

  const onShare = (id: string, shareId: string) => {
    setShareId(shareId);
    setItineraryId(id);
    setIsOpen(true);
  };

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/itinerary/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Server error during deletion error.");
      }

      await response.json();
      setItineraries((prev) => {
        return prev.filter((ele) => ele._id !== id);
      });
      toast.success("Itinerary deleted successfully");
    } catch (error) {
      console.error("Itinerary Deletion Error:", error);
      toast.error("Itinerary deletion error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[90vh] flex items-center justify-center">
        Loading itineraries...
      </div>
    );
  }

  return (
    <>
      <ShareDialog
        open={isOpen}
        onOpenChange={() => setIsOpen(false)}
        shareId={shareId}
        itineraryId={itineraryId}
        setLinkGenerated={setLinkGenerated}
      />
      <div className="flex flex-col gap-y-5 justify-center items-center">
        <div className="flex w-full px-7 mt-6 items-center justify-between">
          <h2 className="text-2xl font-semibold">Itineraries</h2>

          <Button className="bg-primary" asChild>
            <Link to="/upload">Generate Itinerary</Link>
          </Button>
        </div>
        <div className="rounded-xl w-[95%] border bg-background">
          {itineraries.length <= 0 ? (
            <EmptyItineraries />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Document</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-15">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {itineraries.length > 0 &&
                  itineraries.map((itinerary) => (
                    <TableRow key={itinerary._id}>
                      <TableCell className="font-medium">
                        {itinerary.title}
                      </TableCell>

                      <TableCell>{itinerary.destination}</TableCell>

                      <TableCell>{itinerary.document?.originalName}</TableCell>

                      <TableCell>
                        {new Date(itinerary.createdAt).toLocaleDateString()}
                      </TableCell>

                      <TableCell>
                        {itinerary.shareId ? (
                          <Badge>Shared</Badge>
                        ) : (
                          <Badge variant="secondary">Private</Badge>
                        )}
                      </TableCell>

                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => onView(itinerary._id)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() =>
                                onShare(itinerary._id, itinerary.shareId)
                              }
                            >
                              <Link2 className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  className="text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>

                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete itinerary?
                                  </AlertDialogTitle>

                                  <AlertDialogDescription>
                                    This action cannot be undone. The itinerary
                                    and its associated document will be
                                    permanently deleted.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                                  <AlertDialogAction
                                    onClick={() => onDelete(itinerary._id)}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
}
