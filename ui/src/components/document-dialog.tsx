import DocumentPreview from "./document-preview";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface DocumentProps {
  fileUrl: string;
  mimeType: string;
  originalName: string;
}

export default function DocumentViewerDialog({
  open,
  onOpenChange,
  document,
}: {
  open: boolean;
  onOpenChange: () => void;
  document: DocumentProps;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogContent className=" max-w-7xl h-[85vh] flex flex-col"> */}
      <DialogContent
        className="
        md:max-w-[70%]
        sm:max-w-[80%]
        h-[90vh]"
      >
        <DialogHeader>
          <DialogTitle>{document?.originalName}</DialogTitle>
        </DialogHeader>
        {/* <div className="flex-1 min-h-0 overflow-hidden relative"> */}
        <DocumentPreview document={document} />
        {/* </div> */}
      </DialogContent>
    </Dialog>
  );
}
