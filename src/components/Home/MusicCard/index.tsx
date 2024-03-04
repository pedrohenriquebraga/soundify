import React, { useMemo } from "react";
import { useTheme } from "styled-components";
import { IMusicData } from "../../../@types/interfaces";
import { usePlayer } from "../../../contexts/player";
import { secondsToTime } from "../../../utils/time";
import {
  MusicArtist,
  MusicArtistContainer,
  MusicButton,
  MusicContentContainer,
  MusicCover,
  MusicCoverContainer,
  MusicDuration,
  MusicName,
  MusicNameContainer,
  MusicPlayingAnimation,
  MusicPlayingAnimationContainer,
} from "./styles";

interface IMusicCardProps {
  music: IMusicData;
}

const MusicCard: React.FC<IMusicCardProps> = ({ music }) => {
  const { handleSelectMusic, allMusics, currentMusic } = usePlayer();

  const currentMusicPath = useMemo(() => {
    if (allMusics && currentMusic) {
      return allMusics[currentMusic.index].path;
    }
  }, [allMusics, currentMusic]);

  return (
    <MusicButton onPress={() => handleSelectMusic(music.index)}>
      <MusicCoverContainer>
        <MusicCover
          resizeMode="cover"
          source={
            music.cover
              ? { uri: music.cover }
              : require("../../../assets/artwork.png")
          }
        />
      </MusicCoverContainer>
      <MusicContentContainer>
        <MusicNameContainer>
          <MusicName
            numberOfLines={2}
            isPlaying={music.path === currentMusicPath}
          >
            {music.name}
          </MusicName>
          {music.path === currentMusicPath && (
            <MusicPlayingAnimationContainer>
              <MusicPlayingAnimation
                source={require("../../../assets/playing.json")}
                speed={0.25}
                autoPlay
                loop
              />
            </MusicPlayingAnimationContainer>
          )}
        </MusicNameContainer>
        <MusicArtistContainer>
          <MusicArtist>{music.artist}</MusicArtist>
        </MusicArtistContainer>
        <MusicDuration>{secondsToTime(music.duration)}</MusicDuration>
      </MusicContentContainer>
    </MusicButton>
  );
};

export default React.memo(MusicCard);
