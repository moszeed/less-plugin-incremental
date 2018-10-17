(() => {
    'use strict';

    const IncrementalPlugin = require("./incremental-plugin.js");

    module.exports = {
        install: function (less, pluginManager) {
            pluginManager.addPreProcessor(new IncrementalPlugin(less));
        }
    };
})();