import React, { useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PageControl from './components/PageControl';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

const PdfView = props => {
  const { url } = props;

  const ref = useRef(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages: _numPages }) {
    setNumPages(_numPages);
  }

  return (
    <Document
      file={url}
      onLoadSuccess={onDocumentLoadSuccess}
      loading="加载中..."
      error="加载失败"
      noData="暂无记录"
    >
      {numPages && (
        <PageControl
          pageNumber={pageNumber}
          numPages={numPages}
          onPrev={() => setPageNumber(pageNumber - 1)}
          onNext={() => setPageNumber(pageNumber + 1)}
        />
      )}
      <Page inputRef={ref} pageNumber={pageNumber} />
    </Document>
  );
};

export default PdfView;
