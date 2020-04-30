const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
    chainWebpack: config => {
        config.module.rules.delete('eslint');
        config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
          {
            // Languages are loaded on demand at runtime
            languages: ['json', 'javascript', 'html', 'xml']
          }
        ])
    }
}
