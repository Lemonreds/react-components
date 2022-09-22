## React-Components

记录React开发中积累的组件、Hook、使用第三方库的DEMO、以及UMI3、Webpack相关。

## 在线DEMO

https://lemonreds.github.io/react-components/

## Component

| 组件名        | 描述             | 时间 |
| ----------- | ---------------- | ------ |
| MarQuee | 文字走马灯组件 | 2021-07-28   |
| FeedBack | 移动端触摸反馈效果组件 | 2021-04-15   |
| TextEllipsis | 单行文本省略 |2021-04-13|
| Accordion | 折叠面板 | 2020-09-27 |
| createLoadable | Webpack动态导入包装组件 | 2020-09-25   |
| Captha | 验证码组件 | 2020-09-21  |
| Form | - | -   |
| Form | 基于rc-field-form的表单封装组件 | 2020-09-28  |
| Form-Slider | 滑动条 | 2020-09-22  |
| Form-Button | 水波纹按钮| 2020-09-21  |
| Form-Input | 输入框 | 2020-09-17  |
| Form-Switch | 开关 | 2020-09-17  |
| HorizontalScroller | 水平滚动容器 | 2020-09-08  |
|TimeLine | 时间线进度条组件 | 2020-06-26  |
|Echarts | E-charts的react容器以及一些配置图表 | 2020-06-26  |
|VirtualList | 虚拟滚动列表 | 2020-06-26  |
|Tabs 标签页 | 标签页 | 2020-07-02 |
|Lazyload | 懒加载组件 | 2020-07-06  |
|Loading | loading组件 | 2020-07-04 |

## Hook

| Hook名        | 描述             | 时间 |
| ----------- | ---------------- | ------ |
| useCalledOnce | 在函数初次渲染前，执行一次Effect，先于didMount。 | 2022-09-20 |
| useMultiEffect | useEffect的扩展，所有依赖项修改时，才会触发Effect | 2022-09-20   |
| useFontSize | 该hook可以提取H5页面在andoird/iOS下，字体缩放的比例 |2021-07-15|
| useLatestRef | 获取最新值，用于解决函数组件闭包陷阱的hook | 2021-07-15 |
| useResizeObserver | 监听DOM元素的宽高以及位置变化 | 2021-03-04 |
| useDraggable | 使容器内的DOM可拖拽 | 2020-09-23  |
| useFullScreen | 基于screenfull.js的全屏hook | 2020-09-23  |
| useTable | 表格状态提取 | 2020-08-26  |
| useInfiniteScroller | 列表无限加载组件 | 2020-08-26 |
| useVirtual | 虚拟滚动列表，支持高度不一致 | 2020-08-21  |
| useOnScreen |  监听DOM元素是否可见  | 2020-08-21  |

## Demo


| Demo名        | 描述             | 时间 |
| ----------- | ---------------- | ------ |
| live | 使用Videojs直播的DEMO，包含的推流格式有：flv、hls。以及基于nodejs的node-media-server搭建的流媒体服务端，便于前端调试。 | 2022-08-24 | 
| react-pdf | 基于react-pdf的改造，增加了虚拟滚动的支持 | 2022-03-14 | 
| react-fast-marquee | 兼容了IE11的文字跑马灯 | 2022-02-15 | 
| m-pull-to-refresh | 一个支持下拉刷新、上拉加载的 React 移动端组件。 | 2021-06-24 | 
| better-scroll | react使用better-scroll的例子 | 2021-05-19 | 
| swiper | react使用swiper.js/react的例子  | 2021-05-26 | 
| AliPlayer | react封装AliPlayer的例子  | 2021-05-10 | 
| react-pdf | react-pdf的使用例子以及分页器  | 2021-05-10 | 
| react-intl | react-intl 的多语言方案,封装了常用的功能 | 2021-04-14 | 

 

## Tool

| Tool        | 描述             | 时间 |
| ----------- | ---------------- | ------ |
| PromiseQueue| Promise 串行队列 | 2022-09-20 | 
| CSSvariable| 基于CSS变量的换肤 | 2020-09-18 | 
| StorageTool|  统一用JSON格式来读写localStorage  | 2020-08-26 |


## UMI-PLUGIN

| plugin名        | 描述             | 时间 |
| ----------- | ---------------- | ------ |
| umi-plugin-intl| 当不使用umi的plugin-locale时，为umi增加react-intl的默认导出 | 2021-04-14 | 
| umi-plugin-404|  为UMI3的约定式路由补上404路由  | 2020-09-16 |
| umi-plugin-filter-routes |  对UMI3约定式路由的再过滤，过滤一些不需要的路由规则，可以删减一些被错误当作路由引入的组件  | 2020-09-15 |


## 本地运行

或者使用 yarn/cnpm 来安装node依赖.

1. npm run install

2. npm run start

3. npm run build

