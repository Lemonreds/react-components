import React, { PureComponent } from 'react';
import * as PDFJS from 'pdfjs-dist';

import DocumentContext from './DocumentContext';
import Message from './Message';
import './Document.less';
import { makeCancellablePromise } from './util';

export default class Document extends PureComponent {
  state = {
    pdf: null,
  };

  componentDidMount() {
    this.loadDocument();
  }

  componentDidUpdate(prevProps) {
    const { file } = this.props;
    if (file !== prevProps.file) {
      this.loadDocument();
    }
  }

  componentWillUnmount() {
    if (this.runningTask) this.runningTask.cancel();
    if (this.loadingTask) this.loadingTask.destroy();
  }

  onLoadSuccess = () => {
    const { onLoadSuccess } = this.props;
    const { pdf } = this.state;

    if (onLoadSuccess) onLoadSuccess(pdf);
  };

  onLoadFailed = (error) => {
    const { onLoadFailed } = this.props;

    if (onLoadFailed) onLoadFailed(error);
  };

  loadDocument = () => {
    if (this.runningTask) this.runningTask.cancel();
    if (this.loadingTask) this.loadingTask.destroy();

    this.setState((prevState) => {
      if (!prevState.pdf) {
        return null;
      }

      return { pdf: null };
    });

    const { file } = this.props;

    try {
      this.loadingTask = PDFJS.getDocument(file);
      this.runningTask = makeCancellablePromise(this.loadingTask.promise);

      this.runningTask.promise
        .then((pdf) => {
          this.setState({ pdf }, this.onLoadSuccess);
        })
        .catch((error) => {
          this.setState({ pdf: false }, () => {
            this.onLoadFailed(error);
          });
        });
    } catch (error) {
      this.setState({ pdf: false }, () => {
        this.onLoadFailed(error);
      });
    }
  };

  get childContext() {
    const { width, height, scale, renderMode } = this.props;
    const { pdf } = this.state;

    return {
      pdf,
      scale,
      width,
      height,
      renderMode,
    };
  }

  renderChildren() {
    const { children } = this.props;

    return (
      <DocumentContext.Provider value={this.childContext}>{children}</DocumentContext.Provider>
    );
  }

  renderContent() {
    const { file } = this.props;
    const { pdf } = this.state;
    if (!file) {
      return <Message>暂无文件</Message>;
    }

    if (pdf === null) {
      return <Message>加载文件中...</Message>;
    }

    if (!pdf) {
      return <Message>加载错误</Message>;
    }

    return this.renderChildren();
  }

  render() {
    const { ref } = this.props;

    return (
      <div className="react-pdf-document" ref={ref} {...this.eventProps}>
        {this.renderContent()}
      </div>
    );
  }
}
