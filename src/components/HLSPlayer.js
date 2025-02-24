import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const HLSPlayer = ({ streamUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    // HLS.js를 사용하여 브라우저에서 HLS 스트리밍을 재생하도록 설정
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(videoElement);

      // HLS.js 이벤트 처리
      // hls.on(Hls.Events.MANIFEST_PARSED, function () {
      //   videoElement.play();
      // });

      // 메모리 해제 및 이벤트 정리
      return () => {
        hls.destroy();
      };
    }
    // Safari 브라우저에서는 기본적으로 HLS를 지원하므로 .m3u8 파일을 직접 사용
    else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = streamUrl;
      videoElement.addEventListener("loadedmetadata", () => {
        videoElement.play();
      });
    }
  }, [streamUrl]);

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} />
    </div>
  );
};

export default HLSPlayer;
