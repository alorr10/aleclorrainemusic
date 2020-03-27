import React, { useState } from 'react';
import ReactPlayer from 'react-player';

import {
  Imperfectly,
  GayForTheWeekend,
  MelatoninDreams,
  CarolineMoana,
  Quarantine,
  QuarantineMusicVideo,
} from './Sounds';
import { Row, Col, Button } from 'react-bootstrap';

const songs = [
  { title: 'Quarantine Music Video', file: QuarantineMusicVideo },
  { title: 'Imperfectly', file: Imperfectly },
  { title: 'Gay For The Weekend', file: GayForTheWeekend },
  { title: 'Melatonin Dreams', file: MelatoninDreams },
  { title: 'Caroline Moana', file: CarolineMoana },
  { title: 'Quarantine', file: Quarantine },
];

function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [activeSong, setActiveSong] = useState(null);

  const onClick = song => {
    if (playing) return setPlaying(false);
    setPlaying(prev => !prev.playing);
    setActiveSong(song);
  };
  //
  return (
    <div>
      {songs.map(song => (
        <Row className="mb-3">
          <Button
            onClick={() => onClick(song)}
            disabled={playing && activeSong.title !== song.title && !!activeSong}
            variant={song.title == 'Quarantine Music Video' ? 'primary' : 'info'}
            style={song.title == 'Quarantine Music Video' ? { height: 80 } : {}}
          >
            {playing && activeSong.title === song.title ? 'Pause' : `Play ${song.title}`}
          </Button>
        </Row>
      ))}
      <ReactPlayer
        url={activeSong ? activeSong.file : Imperfectly}
        playing={playing}
        controls={activeSong ? activeSong.title == 'Quarantine Music Video' : false}
      />
    </div>
  );
}

export default MusicPlayer;
