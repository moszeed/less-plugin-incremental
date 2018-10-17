(() => {
    "use strict";

    const fs = require('fs');
    const path = require('path');
    const crypto = require('crypto');

    const cacheFilePath = path.join(process.cwd(), '.lessCache');
    const cache = (function () {
        if (fs.existsSync(cacheFilePath)) {
            // check if cache file is from today, if not then renew
            const stat = fs.statSync(cacheFilePath);
            const statDay = (new Date(stat.mtime)).setHours(0,0,0,0);
            const todayDay = (new Date()).setHours(0,0,0,0);

            if(statDay === todayDay) {
                return JSON.parse(fs.readFileSync(cacheFilePath, 'utf8'));
            }
        }
        return {};
    })();

    module.exports = IncrementalPlugin;

    /**
     *
     */
    function createChecksum (data) {
        if (Array.isArray(data) ||
            data === Object(data)) {
            data = JSON.stringify(data);
        }

        return crypto
            .createHash('sha1')
            .update(data, 'utf8')
            .digest('hex');
    }

    function saveCache () {
        fs.writeFileSync(cacheFilePath, JSON.stringify(cache, null, 2), 'utf8');
    }

    function IncrementalPlugin (less) {
        this.less = less;
        this.rebuildIsNeeded = false;
    };

    IncrementalPlugin.prototype.process = function(src, extra) {
        // dont check file if already clear we need rebuilding
        if (this.rebuildIsNeeded) {
            return src;
        }

        const srcCheckSum = createChecksum(src);
        const optionChecksum = createChecksum(JSON.stringify(this.less.options));
        const combinedChecksum = createChecksum(`${srcCheckSum}-${optionChecksum}`);

        // has file changed, normal handling (but save cache)
        if (cache[extra.fileInfo.filename] !== combinedChecksum) {
            this.less.logger.info(`less-plugin-incremental: file has changed, rebuilding (${path.basename(extra.fileInfo.filename)})`);
            this.rebuildIsNeeded = true;
            this.less.options.lint = false;
            cache[extra.fileInfo.filename] = combinedChecksum;
            saveCache();
            return src;
        }

        this.less.logger.info(`less-plugin-incremental: file not changed (${path.basename(extra.fileInfo.filename)})`);

        // *hack* switch to lint mode to prevent writing to disc
        this.less.options.lint = true;

        return src;
    };
})();