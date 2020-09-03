const specsPath = "./src";

exports.config = {
  // The address of a running selenium server.
  seleniumAddress: "http://localhost:4444/wd/hub",

  allScriptsTimeout: 15000,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: "chrome",
  },

  framework: "jasmine",

  // Spec patterns are relative to the configuration file location passed
  specs: [
    `${specsPath}/ghost-org.spec.ts`,
    `${specsPath}/way-2-automation.spec.ts`,
  ],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  },
  onPrepare: function () {
    require("ts-node").register();
  },
};
