import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface AudioPlayerProps {
  src: string;
  title: string;
  artist: string;
}

export default function AudioPlayer({ src, title, artist }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      const newVolume = value[0];
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(currentTime + 10, duration);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(currentTime - 10, 0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-5 shadow-lg">
      <audio ref={audioRef} src={src} />

      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shrink-0 shadow-lg overflow-hidden">
          <Icon name="Music" size={32} className="text-white z-10" />
          {isPlaying && (
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h5 className="font-bold text-lg truncate">{title}</h5>
          <p className="text-sm text-muted-foreground truncate">{artist}</p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="hover:bg-purple-100 shrink-0"
        >
          <Icon name={isMuted ? 'VolumeX' : 'Volume2'} size={20} />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
          <div 
            className="absolute top-0 left-0 h-2 bg-gradient-to-r from-primary via-secondary to-accent rounded-full pointer-events-none transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={skipBackward}
            className="hover:bg-purple-100"
          >
            <Icon name="SkipBack" size={20} />
          </Button>

          <Button
            size="icon"
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 shadow-lg"
          >
            <Icon name={isPlaying ? 'Pause' : 'Play'} size={24} className="text-white" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={skipForward}
            className="hover:bg-purple-100"
          >
            <Icon name="SkipForward" size={20} />
          </Button>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Icon name={isMuted ? 'VolumeX' : 'Volume2'} size={16} className="text-muted-foreground" />
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground font-medium w-8 text-right">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
