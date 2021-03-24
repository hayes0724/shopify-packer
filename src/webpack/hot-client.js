/* eslint-env browser */
const tmpPublicPath = __webpack_public_path__;
__webpack_public_path__ = __webpack_public_path__.replace(/\/$/, '');
// eslint-disable-next-line node/no-missing-require
const client = require('webpack-hot-middleware/client?dynamicPublicPath=true');
__webpack_public_path__ = tmpPublicPath;
window.__shopify_should_reload__ = false;

client.subscribe((event) => {
  if (event.action === 'shopify_upload_finished') {
    if (event.force || window.__shopify_should_reload__) {
      window.location.reload();
    }
  }
});
