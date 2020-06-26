/* eslint-disable no-param-reassign */
import React from 'react';
import ReactDom from 'react-dom';
import echarts from 'echarts';
import bind from 'utils/bind';
import isEqual from 'fast-deep-equal';

const defaultWidth = '100%';
const defaultHeight = 450;

/**
    @component   对e-charts的react封装, 修改自echart-for-react
 */
class Chart extends React.Component {
  state = { ins: null };

  ele = null;

  componentDidMount() {
    this.init();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { option } = this.props;
    const { ins } = this.state;

    return !isEqual(nextProps, option) || !isEqual(nextState.ins, ins);
  }

  componentDidUpdate(prevProps, prevState) {
    const { option } = this.props;
    const { ins } = this.state;

    if (!isEqual(prevProps.option, option) || !isEqual(prevState.ins, ins)) {
      this.renderCharts();
    }
  }

  renderCharts = () => {
    const { option, renderTooltip } = this.props;
    const { ins } = this.state;

    const dontUseToolTip = option.tooltip || !renderTooltip;

    return ins.setOption(
      Object.assign(
        {},
        option,
        dontUseToolTip
          ? null
          : {
              tooltip: {
                trigger: 'item',
                showContent: true,
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                triggerOn: 'mousemove',
                padding: 0,
                formatter: () => '这段文本其实没什么用 :)',
                position: (point, param, dom) => {
                  const fragment = document.createDocumentFragment();
                  const d = document.createElement('div');
                  ReactDom.render(
                    <div
                      style={{
                        backgroundColor: '#fff',
                      }}
                    >
                      {renderTooltip(param)}
                    </div>,
                    d,
                  );
                  fragment.appendChild(d);
                  dom.innerHTML = '';
                  dom.appendChild(fragment);
                  return point;
                },
              },
            },
      ),
      true,
    );
  };

  init() {
    const { onEvents, style, ref } = this.props;
    const ins = echarts.init(this.ele);
    this.setState(
      {
        ins,
      },
      () => {
        if (ref instanceof Function) {
          ref(ins);
        }
        //  注册监听
        Object.keys(onEvents).forEach(event => {
          const listener = onEvents[event];
          if (listener instanceof Function) {
            ins.on(event, listener);
          }
        });
        // autoSize
        bind(this.ele, e => {
          const { target } = e;
          try {
            ins.resize({
              width: target.clientWidth || defaultWidth,
              height: style.height || defaultHeight,
            });
          } catch (err) {
            // eslint-disable-next-line no-console
            console.warn(err);
          }
        });
      },
    );
  }

  render() {
    const { style } = this.props;
    const newStyle = {
      width: defaultWidth,
      height: defaultHeight,
      ...style,
    };

    return (
      <div
        ref={e => {
          if (e) {
            this.ele = e;
          }
        }}
        style={newStyle}
      />
    );
  }
}

Chart.defaultProps = {
  option: {}, // e-charts 的配置
  onEvents: {}, // e-charts 的事件监听
  style: {}, // 图表的样式，高度默认是450
  renderTooltip: null, // 是否自定义tooltip
};

export default Chart;
