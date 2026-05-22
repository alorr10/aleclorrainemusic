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
import isley1 from "./images/isley1.jpg";
import backinjackson from "./images/backinjackson.png";
import traintoutah from "./images/traintoutah.png";
import isleyking from "./images/isleyking.jpg";
import isleybday from "./images/isleybday.jpg";
import maddie from "./images/maddie.png";

const SONGS = [
  { title: "Dolphin Girl", file: DolphinGirl, art: album4 },
  { title: "Back in Jackson", file: BackInJackson, art: backinjackson },
  { title: "Locker Room Party", file: LockerRoomParty, art: album6 },
  { title: "Rescue Me", file: RescueMe, art: album5 },
  { title: "Stick It In", file: StickItIn, art: album3 },
  { title: "Train to Utah", file: TrainToUtah, art: traintoutah },
  { title: "Gay For The Weekend", file: GayForTheWeekend, art: album7 },
  { title: "Imperfectly", file: Imperfectly, art: album1 },
  {
    title: "Isley's Birthday Medley",
    file: IsleysBirthdayMelody,
    art: isleybday,
  },
  { title: "Just Friends", file: JustFriends, art: isley1 },
  { title: "Isley King", file: IsleyKing, art: isleyking },
  { title: "See You Again Maddie", file: SeeYouAgainMaddie, art: maddie },
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
  const [activeIndex, setActiveIndex] = useState(4);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [morePlaying, setMorePlaying] = useState(null);
  const audioRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = SONGS[activeIndex].file;
    audio.load();
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [activeIndex]);

  // Navigate side slides via document-level click, bypassing 3D hit-test issues with loop clones
  useEffect(() => {
    const onClick = (e) => {
      const swiper = swiperRef.current;
      if (!swiper) return;

      // Ignore clicks on the play button
      if (e.target.closest(".play-btn")) return;

      const activeSlide = swiper.slides[swiper.activeIndex];
      if (!activeSlide) return;

      const swiperRect = swiper.el.getBoundingClientRect();

      // Only handle clicks within the swiper's vertical bounds
      if (e.clientY < swiperRect.top || e.clientY > swiperRect.bottom) return;

      const activeRect = activeSlide.getBoundingClientRect();

      if (e.clientX < activeRect.left) {
        swiper.slidePrev();
      } else if (e.clientX > activeRect.right) {
        swiper.slideNext();
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

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
        loop
        initialSlide={4}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 160,
          modifier: 1,
          slideShadows: true,
        }}
        navigation
        keyboard={{ enabled: true }}
        slideToClickedSlide
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="song-swiper"
      >
        {SONGS.map((song, index) => (
          <SwiperSlide key={song.title} className="song-slide">
            <div
              className={`song-card${index === activeIndex ? " active" : ""}`}
            >
              <img src={song.art} alt={song.title} className="album-art" />
              <div className="card-gradient" />
              <div className="card-title">{song.title}</div>
              {index === activeIndex && (
                <div className="play-overlay">
                  <button
                    className="play-btn"
                    aria-label={playing ? "Pause" : "Play"}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                  >
                    {playing ? <PauseIcon /> : <PlayIcon />}
                  </button>
                  <input
                    type="range"
                    className="seek-bar"
                    min={0}
                    max={duration || 1}
                    step={0.1}
                    value={currentTime}
                    style={{
                      "--pct": `${duration ? (currentTime / duration) * 100 : 0}%`,
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      const t = parseFloat(e.target.value);
                      audioRef.current.currentTime = t;
                      setCurrentTime(t);
                    }}
                  />
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <audio
        ref={audioRef}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
      />

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
