// Load configuration from environment or config file
const path = require('path');

// Environment variable overrides
const config = {
  disableHotReload: process.env.DISABLE_HOT_RELOAD === 'true',
};

// Set environment variable to suppress source-map warnings
process.env.GENERATE_SOURCEMAP = 'false';

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      
      // Configure ignoreWarnings to suppress MediaPipe warnings
      webpackConfig.ignoreWarnings = [
        ...(webpackConfig.ignoreWarnings || []),
        /Failed to parse source map/,
        /Can't resolve 'source-map-url'/,
        /@mediapipe\/tasks-vision/,
        function (warning, compilation) {
          if (warning.message && warning.message.includes('@mediapipe/tasks-vision')) {
            return true;
          }
          if (warning.message && warning.message.includes('Failed to parse source map')) {
            return true;
          }
          return false;
        },
      ];

      // Find and modify source-map-loader rules
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.enforce === 'pre' && Array.isArray(rule.use)) {
          rule.use.forEach((useItem) => {
            if (typeof useItem === 'object' && useItem.loader && useItem.loader.includes('source-map-loader')) {
              // Add exclude patterns
              rule.exclude = [
                ...(rule.exclude || []),
                /node_modules\/@mediapipe/,
              ];
            }
          });
        }
      });
      
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