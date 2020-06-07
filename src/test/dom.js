const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/",
  contentType: "text/html",
  includeNodeLocations: true,
  storageQuota: 10000000,
});
function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter((prop) => typeof target[prop] === "undefined")
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop),
      }),
      {}
    );
  Object.defineProperties(target, props);
}
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: "node.js",
};
copyProps(window, global);
