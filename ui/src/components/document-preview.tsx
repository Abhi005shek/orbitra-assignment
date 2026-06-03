interface Props {
  document: {
    fileUrl: string;
    mimeType: string;
    originalName: string;
  };
}

export default function DocumentPreview({ document }: Props) {
  const isImage = document?.mimeType?.startsWith("image/");

  const isPdf = document?.mimeType === "application/pdf";

  if (isImage) {
    return (
      <div className="flex h-full items-center justify-center overflow-auto">
        <img
          src={document?.fileUrl}
          alt="Travel Document"
          className="max-h-full rounded-lg"
        />
      </div>
    );
  }

  if (isPdf) {
    return (
      <div className="h-full w-full absolute top-0 py-10 px-4 ">
        <iframe
          src={`${document.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
          title={document.originalName}
          className="h-full w-full rounded-lg border"
        />
      </div>
    );
  }

  return <div>Unsupported document type</div>;
}
