import { kakaoMapsAppKey } from "./config.js";

export function loadKakaoMaps() {
  if (window.kakao?.maps?.Map) {
    return Promise.resolve(window.kakao);
  }

  if (window.__kakaoMapsPromise) {
    return window.__kakaoMapsPromise;
  }

  window.__kakaoMapsPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById("kakao-maps-sdk");
    const script = existingScript || document.createElement("script");

    script.id = "kakao-maps-sdk";
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapsAppKey}&autoload=false&libraries=services`;
    script.onload = () => {
      window.kakao.maps.load(() => resolve(window.kakao));
    };
    script.onerror = () => {
      window.__kakaoMapsPromise = null;
      reject(new Error(`Kakao Maps SDK failed to load: ${script.src}`));
    };

    if (!existingScript) {
      document.head.appendChild(script);
    }
  });

  return window.__kakaoMapsPromise;
}

window.loadKakaoMaps = loadKakaoMaps;
