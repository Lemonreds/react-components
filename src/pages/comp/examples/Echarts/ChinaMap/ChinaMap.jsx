import React from 'react';
import { MapCharts, province } from 'components/Echarts';

import Tooltip from './Tooltip';

const colors = ['#8868ff', '#24cdd0', '#ffc84e', '#fe657f', '#748cfd'];

class Chart extends React.Component {
  state = { mockdata: [] };

  componentDidMount() {
    this.mockdata();
  }

  mockdata = () => {
    const datas = [];
    Object.keys(province).forEach((key, index) => {
      const [lng, lnt] = province[key];
      datas.push({
        name: key,
        value: [lng, lnt],
        itemStyle: {
          normal: {
            color: colors[index % colors.length],
          },
        },
      });
    });
    this.setState({ mockdata: datas });
  };

  render() {
    const { mockdata: list } = this.state;
    return (
      <MapCharts
        style={{ width: 595, height: 450 }}
        renderTooltip={params => <Tooltip data={params} />}
        option={{
          backgroundColor: '#fff',
          tooltip: null,
          confine: true,
          geo: {
            map: 'china',
            show: true,
            roam: false,
            label: {
              normal: {
                show: true,
                color: '#737373',
                fontSize: 9,
              },
              emphasis: {
                show: true,
                color: '#737373',
                fontSize: 9,
              },
            },
            itemStyle: {
              borderColor: '#fff',
              areaColor: '#eee',
              borderWidth: 2.5,
            },
            emphasis: {
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 0.8,
                areaColor: '#f7f7f7',
                shadowColor: '#0593f8',
                shadowBlur: 15,
              },
            },
          },
          series: [
            {
              name: 'TintPoint',
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: 'circle',
              symbolSize: 10,
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 9,
                  },
                  formatter: () => '',
                },
              },
              itemStyle: {
                normal: {
                  color: '#a1d468',
                },
              },
              data: list,
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke',
              },
              hoverAnimation: true,
              zlevel: 1,
            },
          ],
        }}
      />
    );
  }
}

export default Chart;
