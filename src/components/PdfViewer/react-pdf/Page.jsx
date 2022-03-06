/* eslint-disable arrow-parens */
import React, { PureComponent } from 'react';

import Message from './Message';
import DocumentContext from './DocumentContext';
import PageContext from './PageContext';
import PageSVG from './PageSVG';
import PageCanvas from './PageCanvas';
import { getPageScale, makeCancellablePromise } from './util';

export class PageInternal extends PureComponent {
  state = {
    page: null,
  };

  componentDidMount() {
    this.loadPage();
  }

  componentDidUpdate(prevProps) {
    const { pdf, pageNumber } = this.props;

    if ((prevProps.pdf && pdf !== prevProps.pdf) || prevProps.pageNumber !== pageNumber) {
      this.loadPage();
    }
  }

  componentWillUnmount() {
    if (this.runningTask) this.runningTask.cancel();
  }

  getPageIndex = (props) => {
    const { pageNumber } = props;
    return pageNumber || null;
  };

  get childContext() {
    const { page } = this.state;

    if (!page) {
      return {};
    }

    return {
      page,
      scale: this.scale,
    };
  }

  get scale() {
    const { page } = this.state;

    if (!page) {
      return null;
    }

    const { scale, width, height } = this.props;

    return getPageScale(page, scale, width, height);
  }

  loadPage = () => {
    const { pdf, pageNumber, onLoadError } = this.props;

    if (!pageNumber) {
      return;
    }

    this.setState((prevState) => {
      if (!prevState.page) {
        return null;
      }
      return { page: null };
    });

    const cancellable = makeCancellablePromise(pdf.getPage(pageNumber));
    this.runningTask = cancellable;

    this.runningTask.promise
      .then((page) => {
        this.setState({ page });
      })
      .catch((error) => {
        this.setState({ page: false });
        if (onLoadError) {
          onLoadError(error);
        }
      });
  };

  renderChildren() {
    const { renderMode, pageNumber } = this.props;

    let children;
    switch (renderMode) {
      case 'none':
        return null;
      case 'svg':
        children = <PageSVG key={`page_svg_${pageNumber}`} />;
        break;
      case 'canvas':
      default:
        children = <PageCanvas key={`page_canvas_${pageNumber}`} />;
    }

    return <PageContext.Provider value={this.childContext}>{children}</PageContext.Provider>;
  }

  renderContent() {
    const { pdf, pageNumber } = this.props;
    const { page } = this.state;

    if (!pageNumber) {
      return <Message>没有该页面</Message>;
    }

    if (pdf === null || page === null) {
      return <Message>加载中....</Message>;
    }

    if (!page) {
      return <Message>加载失败</Message>;
    }

    return this.renderChildren();
  }

  render() {
    const { pageNumber } = this;

    return (
      <div
        className="react-pdf-page"
        data-page-number={pageNumber}
        ref={this.ref}
        style={{ position: 'relative', background: '#fff' }}
      >
        {this.renderContent()}
      </div>
    );
  }
}

function Page(props, ref) {
  return (
    <DocumentContext.Consumer>
      {(context) => <PageInternal ref={ref} {...context} {...props} />}
    </DocumentContext.Consumer>
  );
}

export default React.forwardRef(Page);
