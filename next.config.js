require('dotenv').config();

// Plugins Requirement

const withPlugins = require('next-compose-plugins');
const nextImages = require('next-images');

// Plugins
const plugins = [[nextImages]];
// Export

module.exports = withPlugins(plugins, {
    target: 'serverless',
    poweredByHeader: false,
    esModule: true,
    images: {
        domains: ['localhost', '*'],
    },
    compress: true,
    onDemandEntries: {
        // period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: 25 * 1000,
        // number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 2,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
});
