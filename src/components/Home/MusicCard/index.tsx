import React, { useMemo } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { IMusicData } from "../../../@types/interfaces";
import { usePlayer } from "../../../contexts/player";
import { secondsToTime } from "../../../utils/time";
import {
  MusicButton,
  MusicContentContainer,
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
  const { colors } = useTheme();
  const { handleSelectMusic, allMusics, currentMusic } = usePlayer();

  const currentMusicPath = useMemo(() => {
    if (allMusics && currentMusic) {
      return allMusics[currentMusic.index].path;
    }
  }, [allMusics, currentMusic]);

  return (
    <MusicButton onPress={() => handleSelectMusic(music.index)}>
      <MusicCoverContainer>
        <MaterialIcons name="music-note" size={70} color={colors.secondary} />
      </MusicCoverContainer>
      <MusicContentContainer>
        <MusicNameContainer>
          {music.path === currentMusicPath && (
            <MusicPlayingAnimationContainer>
              <MusicPlayingAnimation
                source={require("../../../assets/playing.json")}
                speed={0.75}
                autoPlay
                loop
              />
            </MusicPlayingAnimationContainer>
          )}
          <MusicName
            numberOfLines={2}
            isPlaying={music.path === currentMusicPath}
          >
            {music.name}
          </MusicName>
        </MusicNameContainer>
        <MusicDuration>{secondsToTime(music.duration)}</MusicDuration>
      </MusicContentContainer>
    </MusicButton>
  );
};

export default React.memo(MusicCard);
