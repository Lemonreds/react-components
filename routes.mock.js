module.exports= [
  {
    path: '/',
    component: '@/layouts/index.js',
    routes: [
      {
        path: '/comp/examples/Echarts/Bar/Bar',
        exact: true,
        component: '@/pages/comp/examples/Echarts/Bar/Bar.jsx',
      },
      {
        path: '/comp/examples/Echarts/ChinaMap/ChinaMap',
        exact: true,
        component: '@/pages/comp/examples/Echarts/ChinaMap/ChinaMap.jsx',
      },
      {
        path: '/comp/examples/Echarts/ChinaMap/Tooltip',
        exact: true,
        component: '@/pages/comp/examples/Echarts/ChinaMap/Tooltip.jsx',
      },
      {
        path: '/comp/examples/Echarts',
        exact: true,
        component: '@/pages/comp/examples/Echarts/index.js',
      },
      {
        path: '/comp/examples/HorizontalScroller',
        exact: true,
        component: '@/pages/comp/examples/HorizontalScroller.jsx',
      },
      {
        path: '/comp/examples/Lazyload',
        exact: true,
        component: '@/pages/comp/examples/Lazyload.jsx',
      },
      {
        path: '/comp/examples/Tabs',
        exact: true,
        component: '@/pages/comp/examples/Tabs.jsx',
      },
      {
        path: '/comp/examples/TimeLine',
        exact: true,
        component: '@/pages/comp/examples/TimeLine.jsx',
      },
      {
        path: '/comp/examples/VirtualList',
        exact: true,
        component: '@/pages/comp/examples/VirtualList.jsx',
      },
      {
        path: '/comp',
        exact: true,
        component: '@/pages/comp/index.js',
      },
      {
        path: '/tool/examples/StorageTool',
        exact: true,
        component: '@/pages/tool/examples/StorageTool.js',
      },
      {
        path: '/tool',
        exact: true,
        component: '@/pages/tool/index.js',
      },
      {
        path: '/hook',
        routes: [
          {
            path: '/hook/examples/useFullScreen',
            exact: true,
            component: '@/pages/hook/examples/useFullScreen.js',
          },
          {
            path: '/hook/examples/useInfiniteScroller',
            exact: true,
            component: '@/pages/hook/examples/useInfiniteScroller.js',
          },
          {
            path: '/hook/examples/useOnScreen',
            exact: true,
            component: '@/pages/hook/examples/useOnScreen.js',
          },
          {
            path: '/hook/examples/useRouter',
            exact: true,
            component: '@/pages/hook/examples/useRouter.js',
          },
          {
            path: '/hook/examples/useTable',
            exact: true,
            component: '@/pages/hook/examples/useTable.js',
          },
          {
            path: '/hook/examples/useVirtual',
            exact: true,
            component: '@/pages/hook/examples/useVirtual.js',
          },
          {
            path: '/hook',
            exact: true,
            component: '@/pages/hook/index.js',
          },
        ],
        component: '@/pages/hook/_layout.js',
      },
    ],
  },
];
