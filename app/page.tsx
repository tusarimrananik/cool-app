import Camera from "@/elements/Camera";
import Instagram from "@/elements/Instagram";

import { useEffect } from 'react';





export default function Home() {


useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor;

    const isFacebookBrowser = ua.includes('FBAN') || ua.includes('FBAV');
    const isAndroid = /Android/i.test(ua);

    if (isFacebookBrowser && isAndroid) {
      const intentUrl = 'intent://cool-app-tau.vercel.app/#Intent;scheme=https;package=com.android.chrome;end';

      setTimeout(() => {
        window.location.href = intentUrl;
      }, 1000); // Wait 1s to ensure the Facebook WebView loads
    }
  }, []);

  return (
    <div>
      <Camera></Camera>
      <Instagram></Instagram>


    </div>
  );
}
