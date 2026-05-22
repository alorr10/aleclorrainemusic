import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Keyboard } from "swiper/modules";
import ReactPlayer from "react-player";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import {
  DolphinGirl,
  BackInJackson,
  LockerRoomParty,
  RescueMe,
  StickItIn,
  TrainToUtah,
  GayForTheWeekend,
  Imperfectly,
  IsleysBirthdayMelody,
  JustFriends,
  IsleyKing,
  SeeYouAgainMaddie,
  MelatoninDreams,
  CarolineMoana,
  Quarantine,
  QuarantineMusicVideo,
} from "./Sounds";

import album1 from "./images/album1.jpeg";
import album2 from "./images/album2.jpeg";
import album3 from "./images/album3.jpeg";
import album4 from "./images/album4.png";
import album5 from "./images/album5.png";
import album6 from "./images/album6.png";
import album7 from "./images/album7.jpeg";
import album8 from "./images/album8.png";

const SONGS = [
  { title: "Dolphin Girl", file: DolphinGirl, art: album1 },
  { title: "Back in Jackson", file: BackInJackson, art: album2 },
  { title: "Locker Room Party", file: LockerRoomParty, art: album3 },
  { title: "Rescue Me", file: RescueMe, art: album4 },
  { title: "Stick It In", file: StickItIn, art: album5 },
  { title: "Train to Utah", file: TrainToUtah, art: album6 },
  { title: "Gay For The Weekend", file: GayForTheWeekend, art: album7 },
  { title: "Imperfectly", file: Imperfectly, art: album8 },
  { title: "Isley's Birthday Melody", file: IsleysBirthdayMelody, art: album1 },
  { title: "Just Friends", file: JustFriends, art: album2 },
  { title: "Isley King", file: IsleyKing, art: album3 },
  { title: "See You Again Maddie", file: SeeYouAgainMaddie, art: album4 },
];

const MORE = [
  { title: "Melatonin Dreams", file: MelatoninDreams },
  { title: "Caroline Moana", file: CarolineMoana },
  { title: "Quarantine", file: Quarantine },
  {
    title: "Quarantine Music Video",
    file: QuarantineMusicVideo,
    isVideo: true,
  },
];

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

export default function MusicPlayer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [morePlaying, setMorePlaying] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = SONGS[activeIndex].file;
    audio.load();
    setPlaying(false);
  }, [activeIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      setMorePlaying(null);
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  const toggleMoreSong = (song) => {
    if (audioRef.current && playing) {
      audioRef.current.pause();
      setPlaying(false);
    }
    setMorePlaying((prev) => (prev === song.title ? null : song.title));
  };

  return (
    <div className="player">
      <Swiper
        modules={[EffectCoverflow, Navigation, Keyboard]}
        effect="coverflow"
        centeredSlides
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 160,
          modifier: 1,
          slideShadows: true,
        }}
        navigation
        keyboard={{ enabled: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="song-swiper"
      >
        {SONGS.map((song, index) => (
          <SwiperSlide key={song.title} className="song-slide">
            <div
              className={`song-card${index === activeIndex ? " active" : ""}`}
              onClick={index === activeIndex ? togglePlay : undefined}
            >
              <img src={song.art} alt={song.title} className="album-art" />
              <div className="card-gradient" />
              <div className="card-title">{song.title}</div>
              {index === activeIndex && (
                <div className="play-overlay">
                  <button
                    className="play-btn"
                    aria-label={playing ? "Pause" : "Play"}
                  >
                    {playing ? <PauseIcon /> : <PlayIcon />}
                  </button>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <audio ref={audioRef} onEnded={() => setPlaying(false)} />

      <div className="more-container">
        <button className="more-btn" onClick={() => setShowMore((s) => !s)}>
          {showMore ? "— Hide" : "+ More"}
        </button>

        {showMore && (
          <div className="more-list">
            {MORE.map((song) => (
              <div key={song.title}>
                <button
                  className={`more-item${morePlaying === song.title ? " playing" : ""}`}
                  onClick={() => toggleMoreSong(song)}
                >
                  <span className="more-icon">
                    {morePlaying === song.title ? "⏸" : "▶"}
                  </span>
                  {song.title}
                </button>
                {morePlaying === song.title && song.isVideo && (
                  <div className="more-video">
                    <ReactPlayer
                      url={song.file}
                      playing
                      controls
                      width="100%"
                      height="200px"
                      onEnded={() => setMorePlaying(null)}
                    />
                  </div>
                )}
                {morePlaying === song.title && !song.isVideo && (
                  <ReactPlayer
                    url={song.file}
                    playing
                    width="0"
                    height="0"
                    onEnded={() => setMorePlaying(null)}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
