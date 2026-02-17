import React, { useRef, useEffect } from 'react'
import { useState } from 'react'
import './MoodSongs.css'

const MoodSongs = ({Songs, currentMood}) => {

     const [ currentSongIndex, setCurrentSongIndex ] = useState(null);
     const [ isPlaying, setIsPlaying ] = useState(false);
     const [ progress, setProgress ] = useState(0);
     const [ volume, setVolume ] = useState(1);
     const audioRef = useRef(null);

     useEffect(() => {
         if (audioRef.current) {
             audioRef.current.volume = volume;
         }
     }, [volume]);

     useEffect(() => {
         const audio = audioRef.current;
         if (audio) {
             const updateProgress = () => {
                 setProgress((audio.currentTime / audio.duration) * 100);
             };
             audio.addEventListener('timeupdate', updateProgress);
             return () => audio.removeEventListener('timeupdate', updateProgress);
         }
     }, [currentSongIndex]);

     const handlePlayPause = () => {
         if (isPlaying) {
             audioRef.current.pause();
             setIsPlaying(false);
         } else {
             audioRef.current.play();
             setIsPlaying(true);
         }
     };

     const handleNext = () => {
         if (currentSongIndex < Songs.length - 1) {
             setCurrentSongIndex(currentSongIndex + 1);
             setIsPlaying(true);
         }
     };

     const handlePrev = () => {
         if (currentSongIndex > 0) {
             setCurrentSongIndex(currentSongIndex - 1);
             setIsPlaying(true);
         }
     };

     const handleSongClick = (index) => {
         setCurrentSongIndex(index);
         setIsPlaying(true);
     };

     const handleProgressChange = (e) => {
         const newProgress = e.target.value;
         setProgress(newProgress);
         audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
     };

     const handleVolumeChange = (e) => {
         setVolume(e.target.value);
     };

   


    return (
        <div className='mood-songs'>
            <h2>Recommended Songs</h2>

            {Songs.map((song, index) => (
                <div className={`song ${currentSongIndex === index ? 'active' : ''}`} key={index} onClick={() => handleSongClick(index)}>
                    <div className="title">
                        <h3>{song.title}</h3>
                        <p>{song.artist}</p>
                    </div>
                    <div className="play-pause-button">
                        <button>
                            {currentSongIndex === index && isPlaying ? <i className="ri-pause-line"></i> : <i className="ri-play-circle-fill"></i>}
                        </button>
                    </div>
                </div>
            ))}

            {currentSongIndex !== null && (
                <div className='audio-controls'>
                    <div className='current-song-info'>
                        <h3>{Songs[currentSongIndex]?.title}</h3>
                        <p>{Songs[currentSongIndex]?.artist}</p>
                    </div>
                    <div className='controls'>
                        <button onClick={handlePrev}><i className="ri-skip-back-line"></i></button>
                        <button onClick={handlePlayPause}>
                            {isPlaying ? <i className="ri-pause-circle-fill"></i> : <i className="ri-play-circle-fill"></i>}
                        </button>
                        <button onClick={handleNext}><i className="ri-skip-forward-line"></i></button>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleProgressChange}
                        className='progress-bar'
                    />
                    <div className='volume-control'>
                        <i className="ri-volume-up-line"></i>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={handleVolumeChange}
                        />
                    </div>
                </div>
            )}

            {currentSongIndex !== null && isPlaying && currentMood && (
                <div className='mood-display'>
                    Current Mood: {currentMood}
                </div>
            )}

            {currentSongIndex !== null && (
                <audio
                    ref={audioRef}
                    src={Songs[currentSongIndex]?.audio}
                    autoPlay={isPlaying}
                    onEnded={() => handleNext()}
                />
            )}
        </div>
    )
}


export default MoodSongs