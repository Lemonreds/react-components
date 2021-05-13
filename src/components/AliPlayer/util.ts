function addScript(source: string): Promise<void> {
  return new Promise(resolve => {
    const s = document.createElement('script');
    s.src = source;
    s.setAttribute('charset', 'utf-8');
    document.body.appendChild(s);
    s.onload = () => {
      resolve();
    };
  });
}

function addStyleLink(source: string): Promise<void> {
  return new Promise(resolve => {
    const l = document.createElement('link');
    l.type = 'text/css';
    l.rel = 'stylesheet';
    l.href = source;
    document.head.appendChild(l);
    l.onload = () => {
      resolve();
    };
  });
}

const playerCDN = {
  stylelink:
    'https://g.alicdn.com/de/prismplayer/2.9.3/skins/default/aliplayer-min.css',
  script: 'https://g.alicdn.com/de/prismplayer/2.9.3/aliplayer-min.js',
};

const skinLayout = [
  {
    name: 'bigPlayButton',
    align: 'cc',
  },
  {
    name: 'H5Loading',
    align: 'cc',
  },
  {
    name: 'errorDisplay',
    align: 'tlabs',
    x: 0,
    y: 0,
  },
  {
    name: 'infoDisplay',
  },
  {
    name: 'tooltip',
    align: 'blabs',
    x: 0,
    y: 56,
  },
  {
    name: 'thumbnail',
  },
  {
    name: 'controlBar',
    align: 'blabs',
    x: 0,
    y: 0,
    children: [
      {
        name: 'progress',
        align: 'blabs',
        x: 0,
        y: 44,
      },
      {
        name: 'playButton',
        align: 'tl',
        x: 15,
        y: 12,
      },
      {
        name: 'timeDisplay',
        align: 'tl',
        x: 10,
        y: 7,
      },

      {
        name: 'fullScreenButton',
        align: 'tr',
        x: 10,
        y: 12,
      },
      {
        name: 'volume',
        align: 'tr',
        x: 5,
        y: 10,
      },
    ],
  },
];

// async AliplayerSDK inject to html
const asyncAliplayerSDK = () => {
  if (window.Aliplayer) {
    return Promise.resolve();
  } else {
    return Promise.all([
      addStyleLink(playerCDN.stylelink),
      addScript(playerCDN.script),
    ]);
  }
};

export { skinLayout, asyncAliplayerSDK };
