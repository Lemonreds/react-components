import React from "react";
import echarts from "echarts";
import china from "./data/china.json";
import Charts from "./Echarts";

const geoJson = { china };

// expand here.
echarts.registerMap(`china`, geoJson.china);

/**
    @component  echart 地图封装
    @at 2019-12-05
    @by lmh
 */
const MapCharts = (props) => <Charts {...props} />;

export default MapCharts;
