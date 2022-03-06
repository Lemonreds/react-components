/* eslint-disable arrow-parens */
import React, { PureComponent } from 'react';
import * as PDFJS from 'pdfjs-dist';

import PageContext from './PageContext';

export class PageSVGInternal extends PureComponent {
  state = {
    svg: null,
  };

  componentDidMount() {
    this.renderSVG();
  }

  get viewport() {
    const { page, scale } = this.props;

    return page.getViewport(scale);
  }

  renderSVG = () => {
    const { page } = this.props;

    this.renderer = page.getOperatorList();

    return this.renderer
      .then((operatorList) => {
        const svgGfx = new PDFJS.SVGGraphics(page.commonObjs, page.objs);
        this.renderer = svgGfx
          .getSVG(operatorList, this.viewport)
          .then((svg) => {
            this.setState({ svg }, this.onRenderSuccess);
          })
          .catch(this.onRenderError);
      })
      .catch(this.onRenderError);
  };

  drawPageOnContainer = (element) => {
    const { svg } = this.state;

    if (!element || !svg) {
      return;
    }

    // Append SVG element to the main container, if this hasn't been done already
    if (!element.firstElementChild) {
      element.appendChild(svg);
    }

    const { width, height } = this.viewport;
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
  };

  render() {
    const { width, height } = this.viewport;

    return (
      <div
        className="react-pdf-page-svg"
        ref={(ref) => this.drawPageOnContainer(ref)}
        style={{
          display: 'block',
          overflow: 'hidden',
          background: '#fff',
          width,
          height,
          margin: '0 auto',
          userSelect: 'none',
          boxShadow: '0 1px 3px 0 #a9a9a9',
        }}
      />
    );
  }
}

export default function PageSVG(props) {
  return (
    <PageContext.Consumer>
      {(context) => <PageSVGInternal {...context} {...props} />}
    </PageContext.Consumer>
  );
}
