var path = require('path')

module.exports = {
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: path.resolve(__dirname, '../../3l-diary-server/repo/src/main/resources/public/static'),
    publicPath: '/static/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.ts'],
    alias: {
      'src': path.resolve(__dirname, '../src')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "html"
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel!eslint',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      },
      // bootstrap.cssの中に使うWebFontを（デフォルトで）base64エンコードされます
      { test: /\.svg(\?v=\d\.\d\.\d)?$/, loader: 'url-loader?mimetype=image/svg+xml' },
      { test: /\.woff(2)?(\?v=\d\.\d\.\d)??$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.eot(\?v=\d\.\d\.\d)?$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d\.\d\.\d)?$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.otf(\?v=\d\.\d\.\d)?$/, loader: 'url-loader?mimetype=application/font-woff' },
      // **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-webpack has access to the jQuery object
    //   { test: /bootstrap.js$/, loader: 'imports?jQuery=jquery' }

      { test: /(bootstrap.js$|bootstrap\/js\/)/, loader: 'imports?jQuery=jquery' }
    ]
  },
  vue: {
    loaders: {
      js: 'babel!eslint'
    }
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  ts: {
      experimentalDecorators: true
  }
}
