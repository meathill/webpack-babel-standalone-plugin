const {validate} = require('schema-utils');

const PLUGIN_NAME = 'BABEL_STANDALONE_PLUGIN';

const schema = {
  type: 'object',
  properties: {
    condition: {
      type: 'string',
    },
  },
  additionalProperties: false,
};

const defaultOptions = {
  condition: 'window.isIE11',
};

class BabelStandalonePlugin {
  constructor(options = {}) {
    validate(schema, options, {
      name: PLUGIN_NAME,
      baseDataPath: 'options',
    });
    this.options = Object.assign(defaultOptions, options);
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, compilation => {
      const {mainTemplate} = compilation;
      mainTemplate.hooks.requireEnsure.tap(
        {
          name: PLUGIN_NAME,
          stage: 1,
        },
        (source, chunk) => {
          if (!chunk.isOnlyInitial()) {
            return source;
          }

          const appendLine = 'document.head.appendChild(script);';
          let index = source.indexOf(appendLine);
          if (index === -1) {
            return source;
          }

          source = `${source.substring(0, index)}// 插入适配 babel-standalone
    if (${this.options.condition}) {
      script.type = 'text/babel';
    }  
    document.head.appendChild(script);
    if (${this.options.condition}) {
        Babel.transformScriptTags({
          length: 1,
          item: function() {
            return script;
          }
        });
        // 手动触发 \`load\` 事件，避免超时
        setTimeout(function () {
          onScriptComplete({type: 'load', target: script, from: '${PLUGIN_NAME}'});
        }, 50);
    }
${source.substring(index + appendLine.length + 1)}`; // \`1\` is line break

          return source;
        }
      );
    });
  }
}

module.exports = BabelStandalonePlugin;
