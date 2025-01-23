import React from "react";

const PdfViewer = ({ fileUrl }) => {
  return (
    <div className="scrollable">
      <iframe
        src={fileUrl}
        className="w-full h-[80vh] md:h-[90vh]"
        title="PDF Viewer"
      />
    </div>
  );
};

export default PdfViewer;
