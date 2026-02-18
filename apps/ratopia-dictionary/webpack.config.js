module.exports = (config) => {
    config.module.rules.forEach((rule) => {
        if (rule.test && rule.test.toString().includes("scss") && Array.isArray(rule.use)) {
            rule.use.forEach((loader) => {
                if (typeof loader === "object" && loader.loader && loader.loader.includes("sass-loader")) {
                    loader.options = { ...loader.options, url: false };
                }
            });
        }
    });

    config.output.publicPath = "/";

    return config;
};
