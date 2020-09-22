import React from 'react';
import { Echarts } from 'components/Echarts';

class Chart extends React.Component {
  state = { data: [], background: [] };

  componentDidMount() {
    this.mockdata();
  }

  mockdata = () => {
    const data = [
      {
        name: 'TYPESCRIPT',
        value: 108,
      },
      {
        name: 'JAVASCRIPT',
        value: 256,
      },
      {
        name: 'CSS',
        value: 524,
      },
      {
        name: 'HTML',
        value: 647,
      },
      {
        name: 'REACTJS',
        value: 58,
      },
      {
        name: 'VUEJS',
        value: 581,
      },
    ];

    const max = data.reduce((p, c) => (p < c.value ? c.value : p), 0);
    const background = new Array(data.length).fill(max + max * 0.5);

    this.setState({ data, background });
  };

  render() {
    const { data, background } = this.state;

    return (
      <Echarts
        style={{ width: 595, height: 400, margin: '0 auto' }}
        renderTooltip={params => {
          return (
            <div
              style={{
                padding: '0 12px',
                height: '38px',
                lineHeight: '38px',
                // border: '1px solid #eee',
                borderRadius: '5px',
                color: '#fff',
                background: '#004aff',
              }}
            >
              {params.name}
              
              {params.value}
            </div>
          );
        }}
        option={{
          grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true,
          },
          xAxis: {
            show: false,
            type: 'value',
          },
          yAxis: {
            show: false,
            type: 'category',
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data,
          },
          series: [
            {
              name: 'bar',
              type: 'bar',
              barWidth: 8,
              barCategoryGap: '20%',
              data,
              z: 2,
              label: {
                show: true,
                position: 'insideLeft',
                distance: 0,
                offset: [0, -13],
                color: '#111',
                formatter: params => `${params.name}`,
              },
              emphasis: {
                itemStyle: {
                  color: '#004aff',
                },
              },
              itemStyle: {
                barBorderRadius: 255,
                color: () => {
                  return {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    global: false,
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgba(0,74,255,0.5)',
                      },
                      {
                        offset: 1,
                        color: 'rgba(0,74,255,0.5)',
                      },
                    ],
                  };
                },
              },
            },
            {
              type: 'bar',
              barWidth: 8,
              barGap: '-100%',
              color: '#f1f1f1',
              silent: true,
              z: 1,
              data: background,
              itemStyle: {
                normal: { color: '#F1F1F1', barBorderRadius: 255 },
              },
              label: {
                show: true,
                position: 'insideRight',
                offset: [0, -13],
                color: '#111',
                formatter: params => {
                  const { dataIndex } = params;
                  const { value } = data[dataIndex];
                  return `${value}`;
                },
              },
            },
          ],
        }}
      />
    );
  }
}

export default Chart;
