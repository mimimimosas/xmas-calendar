import { useEffect, useRef, useState } from "react";
import { Button, ProgressBar, Toolbar } from "react95";
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original'
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';

// normale Schrift schon geladen
const normalFont = new FontFace('ms_sans_serif', `url(${ms_sans_serif})`);
normalFont.load().then((loadedFont) => document.fonts.add(loadedFont));

export default function Win95Player({videoId, imgSrc }) {
  const playerRef = useRef(null);
  const intervalRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);


    // --- Helfer: Sekunden -> mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };
  
  function startProgress(videoDuration) {
    stopProgress();
    intervalRef.current = setInterval(() => {
      if (!playerRef.current) return;
      const current = playerRef.current.getCurrentTime();
      setCurrentTime(current);

      if (videoDuration > 0) {
        setProgress(Math.round((current / videoDuration) * 100));
      }
    }, 500);
  }

  function stopProgress() {
    clearInterval(intervalRef.current);
  }

// --- Player events
function onStateChange(e) {
  if (e.data === window.YT.PlayerState.PLAYING) {
    setIsPlaying(true);
    const videoDuration = playerRef.current.getDuration(); 
    startProgress(videoDuration);
  } else if (e.data === window.YT.PlayerState.PAUSED) {
    setIsPlaying(false);
    stopProgress();
  } else if (e.data === window.YT.PlayerState.ENDED) {
    setIsPlaying(false);
    stopProgress();
    setProgress(0);
    setCurrentTime(0);
  }
}
  const onPlayerReady = (e) => {
    // --- Dauer zuverlässig holen
    const checkDuration = () => {
      const videoDuration = e.target.getDuration();
      if (videoDuration && videoDuration > 0) {
        setDuration(videoDuration);
        console.log("Player ready, duration:", videoDuration);
      } else {
        setTimeout(checkDuration, 200); // alle 200ms prüfen
      }
    };
    checkDuration();
  };

const containerRef = useRef(null);

function createPlayer() {
    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }
    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId,
      events: {
        onReady: onPlayerReady,
        onStateChange,
      },
    });
  }

  // -- YT Api laden
  useEffect(() => {
    if (window.YT && window.YT.Player   ) {
      createPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    }

    return () => {
      stopProgress();

    if (playerRef.current) {
      playerRef.current.destroy(); 
      playerRef.current = null;
    }
 };

  }, [videoId]);

  return (
    <ThemeProvider theme={original}>
      {/* invisible youtube player */}
      <div ref={containerRef} style={{display: "none"}}/>

      {/* Fake video screen */}
      <div style={{width: "100%",
          height: "140px",
          border: "1px inset",
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "6px",
        position: "relative",   
        overflow: "hidden", 
        }}>
         <img
            src={imgSrc || "/win95-player-placeholder.png"}
            alt="Video preview"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "contrast(1.15) brightness(0.95) saturate(0.9)",
            }}
          />
          <div
            style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `
                repeating-linear-gradient(
                to bottom,
                rgba(0,0,0,0.15) 0px,
                rgba(0,0,0,0.15) 1px,
                rgba(0,0,0,0) 2px,
                rgba(0,0,0,0) 4px
                )
            `,
            mixBlendMode: "multiply",
            }}
        />

        {/* CRT Glow / Vignette */}
        <div
            style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.6)",
            }}
        />
        </div>

    {/* Controls */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "8px" }}>
            <Button onClick={() => playerRef.current?.playVideo()} style={{ width: "40px"}}>▶</Button>
            <Button onClick={() => playerRef.current?.pauseVideo()} style={{ width: "40px" }}>⏸</Button>
            <Button
            onClick={() => {
                playerRef.current?.stopVideo();
                setProgress(0);
                setCurrentTime(0);
            }}
            style={{ width: "40px" }}
            >
          ⏹
            </Button>
        </div>
      {/* ProgressBar */}
        <ProgressBar value={progress}  style={{ marginTop: "12px", fontFamily: "'ms_sans_serif', sans-serif"}} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginTop: "0px"}}>
            <span style={{fontFamily: "'ms_sans_serif', sans-serif"}}>{formatTime(currentTime)}</span>
            <span style={{fontFamily: "'ms_sans_serif', sans-serif"}}>{formatTime(duration)}</span>
        </div>
    </ThemeProvider>
  );
}
