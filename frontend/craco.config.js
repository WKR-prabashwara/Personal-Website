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
      
      // Suppress MediaPipe source map warnings and errors
      webpackConfig.stats = {
        ...webpackConfig.stats,
        warningsFilter: [
          /Failed to parse source map/,
          /Can't resolve 'source-map-url'/,
          /@mediapipe/,
        ]
      };

      // Configure ignoreWarnings to suppress MediaPipe warnings
      webpackConfig.ignoreWarnings = [
        ...(webpackConfig.ignoreWarnings || []),
        function (warning) {
          return warning.message && (
            warning.message.includes('@mediapipe/tasks-vision') ||
            warning.message.includes('Failed to parse source map') ||
            warning.message.includes('vision_bundle_mjs.js.map')
          );
        },
        /Failed to parse source map.*@mediapipe.*vision_bundle_mjs\.js\.map/,
        /Failed to parse source map from.*@mediapipe.*tasks-vision/,
      ];

      // Configure module rules to exclude MediaPipe from source-map-loader
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.enforce === 'pre' && rule.use) {
          rule.use.forEach((use) => {
            if (use.loader && use.loader.includes('source-map-loader')) {
              use.options = use.options || {};
              use.options.filterSourceMappingUrl = (url, resourcePath) => {
                // Skip source maps for MediaPipe modules
                if (resourcePath && resourcePath.includes('@mediapipe/tasks-vision')) {
                  return false;
                }
                return true;
              };
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