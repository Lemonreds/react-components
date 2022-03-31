/**
 * videojs的插件
 * 用于禁止拖拽进度条
 */
(function(vjs) {
  var extend = function(obj /*, arg1, arg2, ... */) {
      var arg, i, k;
      for (i = 1; i < arguments.length; i++) {
        arg = arguments[i];
        for (k in arg) {
          if (arg.hasOwnProperty(k)) {
            obj[k] = arg[k];
          }
        }
      }
      return obj;
    },
    defaults = {
      autoDisable: false
    },
    disableProgress = function(options) {
      var player = this,
        state = false,
        settings = extend({}, defaults, options || {});

      player.controlProgress = {
        disable: function() {
          state = true;

          const controls = document.querySelector('.vjs-progress-control');
          if (controls) {
            controls.style.pointerEvents = 'none';
          }
        },
        enable: function() {
          state = false;
          const controls = document.querySelector('.vjs-progress-control');
          if (controls) {
            controls.style.pointerEvents = 'auto';
          }
        },
        getState: function() {
          return state;
        }
      };

      if (settings.autoDisable) {
        player.controlProgress.disable();
      }
    };

  vjs.plugin('disableProgress', disableProgress);
})(window.videojs);
