import { FB_PIXEL_ID } from "../config";

class Vendors {
  constructor() {
    this.initFacebookPixel();
  }

  initFacebookPixel() {
    if (!FB_PIXEL_ID) {
      console.warn("Facebook Pixel ID is missing.");
      return;
    }

    if (window.fbq && typeof fbq === "function") {
      console.log("Facebook Pixel already initialized. Skipping.");
      return;
    }

    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );

    fbq("init", FB_PIXEL_ID);
    fbq("track", "PageView");

    console.log("Facebook Pixel initialized.");

    this.addNoScriptPixel(FB_PIXEL_ID);
  }

  addNoScriptPixel(pixelID) {
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `
      <img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=${pixelID}&ev=PageView&noscript=1" />
    `;
    document.body.appendChild(noscript);
    console.log("Facebook Pixel noscript tag added.");
  }
}

export default new Vendors();
