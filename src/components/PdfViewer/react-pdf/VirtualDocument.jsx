/* eslint-disable arrow-parens */
import React from 'react';
import { VariableSizeList as List } from 'react-window';

import AutoSizer from './AutoSizer';
import Document from './Document';
import VirtualPage from './VirtualPage';
import VirtualPageControl from './VirtualPageControl';
import { getPageScale } from './util';

class VirtualDocumentInternal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      numPages: undefined,
      cachedPageDimensions: null,
    };

    this.pdf = null;
    this.dvContainerRef = React.createRef();
  }

  componentDidUpdate(preProps) {
    const { width, height, scale } = this.props;
    if (width !== preProps.width || height !== preProps.height || scale !== preProps.scale) {
      this.handleBoundsResize();
    }
  }

  handleBoundsResize = () => {
    if (!this.pdf) {
      return;
    }
    this.setState({ cachedPageDimensions: null }, () => {
      this.cachePageDimensions(this.pdf);
    });
  };

  cachePageDimensions = (pdf) => {
    // eslint-disable-next-line arrow-parens
    const promises = Array.from({ length: pdf.numPages }, (v, i) => i + 1).map((pageNumber) =>
      pdf.getPage(pageNumber),
    );

    let pageScale;
    return Promise.all(promises).then((values) => {
      const { scale, width, height } = this.props;

      const pageDimensions = values.reduce((accPageDimensions, page) => {
        if (!pageScale) {
          pageScale = getPageScale(page, scale, width, height);
        }

        accPageDimensions.set(page.pageIndex + 1, [
          page.view[2] * pageScale,
          page.view[3] * pageScale,
        ]);
        return accPageDimensions;
      }, new Map());

      this.setState({
        cachedPageDimensions: pageDimensions,
      });
    });
  };

  onDocumentLoadSuccess = (pdf) => {
    this.pdf = pdf;
    this.setState({ numPages: pdf.numPages });
    this.cachePageDimensions(pdf);
  };

  getItemSize = (index) => {
    const { cachedPageDimensions } = this.state;
    const dimension = cachedPageDimensions.get(index + 1);
    if (!dimension) {
      return 0;
    }
    return dimension[1];
  };

  onItemsRendered = (itemsRendered) => {
    const { visibleStartIndex } = itemsRendered;
    this.setState({ currentPage: visibleStartIndex + 1 });
  };

  render() {
    const { width, height, scale, renderMode, file } = this.props;
    const { currentPage, numPages, cachedPageDimensions } = this.state;

    return (
      <div
        className="react-pdf-virual-document"
        style={{ width, height, position: 'relative', background: 'white' }}
      >
        <Document
          file={file}
          onLoadSuccess={this.onDocumentLoadSuccess}
          width={width}
          scale={scale}
          renderMode={renderMode}
        >
          {cachedPageDimensions != null && (
            <List
              height={height}
              style={{ overflowX: 'hidden' }}
              itemCount={numPages}
              itemSize={this.getItemSize}
              itemData={null}
              overscanCount={6}
              onItemsRendered={this.onItemsRendered}
            >
              {VirtualPage}
            </List>
          )}
        </Document>
        <VirtualPageControl currentPage={currentPage} numPages={numPages} />
      </div>
    );
  }
}

function VirtualDocument(props, ref) {
  return (
    <AutoSizer>
      {({ width, height }) => (
        <VirtualDocumentInternal ref={ref} width={width} height={height} {...props} />
      )}
    </AutoSizer>
  );
}

export default React.forwardRef(VirtualDocument);
