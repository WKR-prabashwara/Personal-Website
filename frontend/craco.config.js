// Load configuration from environment or config file
const path = require('path');

// Environment variable overrides
const config = {
  disableHotReload: process.env.DISABLE_HOT_RELOAD === 'true',
};

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      
      // Suppress MediaPipe source map warnings
      webpackConfig.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/@mediapipe\/tasks-vision/,
        ],
      });

      // Configure source-map-loader to ignore MediaPipe warnings
      const sourceMapLoaderRule = webpackConfig.module.rules.find(
        rule => rule.use && rule.use.some && rule.use.some(use => 
          use && use.loader && use.loader.includes('source-map-loader')
        )
      );
      
      if (sourceMapLoaderRule) {
        sourceMapLoaderRule.exclude = [
          ...(sourceMapLoaderRule.exclude || []),
          /node_modules\/@mediapipe\/tasks-vision/,
        ];
      }

      // Disable source map warnings for MediaPipe
      webpackConfig.ignoreWarnings = [
        ...(webpackConfig.ignoreWarnings || []),
        {
          module: /node_modules\/@mediapipe\/tasks-vision/,
          message: /Failed to parse source map/,
        },
        /Failed to parse source map.*@mediapipe\/tasks-vision/,
      ];
      
      // Disable hot reload completely if environment variable is set
      if (config.disableHotReload) {
        // Remove hot reload related plugins
        webpackConfig.plugins = webpackConfig.plugins.filter(plugin => {
          return !(plugin.constructor.name === 'HotModuleReplacementPlugin');
        });
        
        // Disable watch mode
        webpackConfig.watch = false;
        webpackConfig.watchOptions = {
          ignored: /.*/, // Ignore all files
        };
      } else {
        // Add ignored patterns to reduce watched directories
        webpackConfig.watchOptions = {
          ...webpackConfig.watchOptions,
          ignored: [
            '**/node_modules/**',
            '**/.git/**',
            '**/build/**',
            '**/dist/**',
            '**/coverage/**',
            '**/public/**',
          ],
        };
      }
      
      return webpackConfig;
    },
  },
};