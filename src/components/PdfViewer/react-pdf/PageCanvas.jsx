/* eslint-disable arrow-parens */
import React, { PureComponent } from 'react';

import PageContext from './PageContext';
import { getPixelRatio } from './util';

export class PageCanvasInternal extends PureComponent {
  componentDidMount() {
    this.drawPageOnCanvas();
  }

  componentDidUpdate(prevProps) {
    const { canvasBackground, page } = this.props;
    if (canvasBackground !== prevProps.canvasBackground) {
      page.cleanup();
      this.drawPageOnCanvas();
    }
  }

  componentWillUnmount() {
    this.cancelRenderingTask();

    if (this.canvasLaye) {
      this.canvasLaye.width = 0;
      this.canvasLaye.height = 0;
      this.canvasLaye = null;
    }
  }

  cancelRenderingTask() {
    if (this.renderer) {
      this.renderer.cancel();
      this.renderer = null;
    }
  }

  onRenderSuccess = () => {
    this.renderer = null;
    const { onRenderSuccess, page, scale } = this.props;

    if (onRenderSuccess) onRenderSuccess((page, scale));
  };

  onRenderError = (error) => {
    const { onRenderError } = this.props;

    if (onRenderError) onRenderError(error);
  };

  get renderViewport() {
    const { page, scale } = this.props;

    const pixelRatio = getPixelRatio();

    return page.getViewport(scale * pixelRatio);
  }

  get viewport() {
    const { page, scale } = this.props;

    return page.getViewport(scale);
  }

  drawPageOnCanvas = () => {
    const { canvasLayer: canvas } = this;

    if (!canvas) {
      return null;
    }

    const { renderViewport, viewport } = this;
    const { canvasBackground, page } = this.props;

    canvas.width = renderViewport.width;
    canvas.height = renderViewport.height;

    canvas.style.width = `${Math.floor(viewport.width)}px`;
    canvas.style.height = `${Math.floor(viewport.height)}px`;
    canvas.style.margin = '0 auto';

    const renderContext = {
      get canvasContext() {
        return canvas.getContext('2d');
      },
      viewport: renderViewport,
    };
    if (canvasBackground) {
      renderContext.background = canvasBackground;
    }

    this.cancelRenderingTask();

    this.renderer = page.render(renderContext);

    return this.renderer.promise.then(this.onRenderSuccess).catch(this.onRenderError);
  };

  render() {
    return (
      <canvas
        className="react-pdf-page-canvas"
        ref={(ref) => {
          this.canvasLayer = ref;
        }}
        style={{
          display: 'block',
          userSelect: 'none',
          boxShadow: '0 1px 3px 0 #a9a9a9',
        }}
      />
    );
  }
}

export default function PageCanvas(props) {
  return (
    <PageContext.Consumer>
      {(context) => <PageCanvasInternal {...context} {...props} />}
    </PageContext.Consumer>
  );
}
