import React, { useEffect, useRef, useState } from 'react';
import SvgIcon from './core/SvgIcon';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioPlayerRef = useRef<HTMLDivElement>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.75);

  useEffect(() => {
    const audioPlayerElement = audioPlayerRef.current;
    if (!audioPlayerElement) return;

    const audioUrl = audioPlayerElement.dataset.targetUrl;
    const audioElement = new Audio(audioUrl);

    audioElement.addEventListener('loadeddata', () => {
      setDuration(audioElement.duration);
    });

    audioElement.volume = volume;
    setAudio(audioElement);

    return () => {
      // Cleanup the audio element on unmount
      audioElement.pause();
      setAudio(null);
    };
  }, []);

  useEffect(() => {
    if (!audio) return;

    const progressBar = audioPlayerRef.current?.querySelector('.progress') as HTMLElement;
    if (progressBar) {
      progressBar.style.width = `${(currentTime / duration) * 100}%`;
    }

    const currentElement = audioPlayerRef.current?.querySelector('.time .current');
    if (currentElement) {
      currentElement.textContent = getTimeCodeFromNum(currentTime);
    }
  }, [currentTime, duration]);

  const getTimeCodeFromNum = (num: number): string => {
    let seconds = Math.floor(num);
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    const hours = Math.floor(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) {
      return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
    }
    return `${String(hours).padStart(2, '0')}:${minutes}:${String(seconds % 60).padStart(2, '0')}`;
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audio) return;

    const timelineElement = audioPlayerRef.current?.querySelector('.timeline');
    if (!timelineElement) return;

    const timelineWidth = window.getComputedStyle(timelineElement).width;
    const timeToSeek = (e.nativeEvent.offsetX / parseInt(timelineWidth)) * audio.duration;
    audio.currentTime = timeToSeek;
  };

  const handleVolumeSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audio) return;

    const volumeSliderElement = audioPlayerRef.current?.querySelector('.controls .volume-slider');
    if (!volumeSliderElement) return;

    const sliderWidth = window.getComputedStyle(volumeSliderElement).width;
    const newVolume = e.nativeEvent.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  const handleTogglePlay = () => {
    if (!audio) return;

    if (audio.paused) {
      setIsPlaying(true);
      audio.play();
    } else {
      setIsPlaying(false);
      audio.pause();
    }
  };

  const handleVolumeButtonClick = () => {
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (audio && !audio.paused) {
        setCurrentTime(audio.currentTime);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [audio]);

  return (
    <div ref={audioPlayerRef} className="audio-player" data-target-url={src}>
      <div className="timeline" onClick={handleTimelineClick}>
        <div className="progress" />
      </div>
      <div className="controls">
        <div className="controls__inner">
          <div className="play-container">
            <div
              className={`toggle-play ${isPlaying ? 'pause' : 'play'}`}
              onClick={handleTogglePlay}
            />
          </div>
          <div className="time">
            <div className="current">0:00</div>
            <div className="divider">/</div>
            <div className="length">{getTimeCodeFromNum(duration)}</div>
          </div>
          <div className="playing">
            <span className={"playing__bar playing__bar1" + (isPlaying ? " active" : "")} />
            <span className={"playing__bar playing__bar2" + (isPlaying ? " active" : "")} />
            <span className={"playing__bar playing__bar3" + (isPlaying ? " active" : "")} />
          </div>
        </div>
        <div className="volume-container">
          <div className="volume-button" onClick={handleVolumeButtonClick}>
            <div className={`volume icono-volumeMedium ${isMuted ? 'muted' : ''}`}>
              {isMuted ?
              <SvgIcon svgName={"volume-mute"}></SvgIcon>
              :
              <SvgIcon svgName={"volume"}></SvgIcon>
              }
            </div>
          </div>
          <div className="volume-slider" onClick={handleVolumeSliderClick}>
            <div className="volume-percentage" style={{ width: `${volume * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;