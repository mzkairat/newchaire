// ================================================================
//  TRACKING PIXELS — AeronCertified
//  Modifie seulement les IDs ci-dessous, ne touche pas le reste
// ================================================================

const PIXELS = {

  // ── FACEBOOK / META PIXEL ──────────────────────────────────────
  // Trouve ton ID sur: business.facebook.com → Events Manager
  facebook: '',          // Exemple: '1234567890123456'

  // ── TIKTOK PIXEL ──────────────────────────────────────────────
  // Trouve ton ID sur: ads.tiktok.com → Assets → Events
  tiktok: '',            // Exemple: 'C4ABCDEF12345678'

  // ── GOOGLE TAG (GA4 / Google Ads) ─────────────────────────────
  // Trouve ton ID sur: analytics.google.com ou Google Ads
  google: '',            // Exemple: 'G-XXXXXXXXXX' ou 'AW-XXXXXXXXX'

  // ── SNAPCHAT PIXEL ────────────────────────────────────────────
  // Trouve ton ID sur: ads.snapchat.com → Assets → Pixels
  snapchat: '',          // Exemple: 'ab12cd34-ef56-7890-abcd-ef1234567890'

  // ── LINKEDIN INSIGHT TAG ───────────────────────────────────────
  // Trouve ton Partner ID sur: linkedin.com/campaignmanager → Account Assets → Insight Tag
  linkedin: '',          // Exemple: '1234567'

};

// ================================================================
//  ⚠️ NE PAS MODIFIER EN DESSOUS DE CETTE LIGNE
// ================================================================

(function () {

  // ── Facebook Pixel ──────────────────────────────────────────
  if (PIXELS.facebook) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', PIXELS.facebook);
    fbq('track', 'PageView');
    var noscript = document.createElement('noscript');
    noscript.innerHTML = '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=' + PIXELS.facebook + '&ev=PageView&noscript=1"/>';
    document.body.appendChild(noscript);
    console.log('✅ Facebook Pixel loaded:', PIXELS.facebook);
  }

  // ── TikTok Pixel ──────────────────────────────────────────
  if (PIXELS.tiktok) {
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track",
      "identify","instances","debug","on","off","once","ready","alias","group","enableCookie",
      "disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
      for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
      ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
      ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};
      ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};
      ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript";
      o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];
      a.parentNode.insertBefore(o,a)};
      ttq.load(PIXELS.tiktok);
      ttq.page();
    }(window, document, 'ttq');
    console.log('✅ TikTok Pixel loaded:', PIXELS.tiktok);
  }

  // ── Google Tag (GA4 / Ads) ─────────────────────────────────
  if (PIXELS.google) {
    var gScript = document.createElement('script');
    gScript.async = true;
    gScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + PIXELS.google;
    document.head.appendChild(gScript);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', PIXELS.google);
    window.gtag = gtag;
    console.log('✅ Google Tag loaded:', PIXELS.google);
  }

  // ── Snapchat Pixel ─────────────────────────────────────────
  if (PIXELS.snapchat) {
    (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?
    a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script';
    r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];
    u.parentNode.insertBefore(r,u);})(window,document,'https://sc-static.net/scevent.min.js');
    snaptr('init', PIXELS.snapchat, { 'user_email': '' });
    snaptr('track', 'PAGE_VIEW');
    console.log('✅ Snapchat Pixel loaded:', PIXELS.snapchat);
  }

  // ── LinkedIn Insight Tag ───────────────────────────────────
  if (PIXELS.linkedin) {
    window._linkedin_partner_id = PIXELS.linkedin;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(PIXELS.linkedin);
    (function(l) {
      if (!l) {
        window.lintrk = function(a,b){ window.lintrk.q.push([a,b]) };
        window.lintrk.q = [];
      }
      var s = document.getElementsByTagName('script')[0];
      var b = document.createElement('script');
      b.type = 'text/javascript'; b.async = true;
      b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
      s.parentNode.insertBefore(b, s);
    })(window.lintrk);
    // noscript fallback
    var liNs = document.createElement('noscript');
    liNs.innerHTML = '<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=' + PIXELS.linkedin + '&fmt=gif" />';
    document.body.appendChild(liNs);
    console.log('✅ LinkedIn Insight Tag loaded:', PIXELS.linkedin);
  }

})();
