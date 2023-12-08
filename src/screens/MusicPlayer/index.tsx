import React from "react";
import Header from "../../components/Header";
import {
  Blur,
  Container,
  MusicArtist,
  MusicControllerButton,
  MusicControllers,
  MusicControllersContainer,
  MusicCover,
  MusicCoverContainer,
  MusicDuration,
  MusicDurationContainer,
  MusicExtraControllerButton,
  MusicExtraControllersContainer,
  MusicInfosContainer,
  MusicName,
  MusicSeek,
  MusicSeekContainer,
} from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { usePlayer } from "../../contexts/player";
import { secondsToTime } from "../../utils/time";

const MusicPlayer: React.FC = () => {
  const {
    currentMusic,
    isPlaying,
    isMuted,
    isLooped,
    useProgress,
    handleMute,
    playAndPauseMusic,
    handlePrevMusic,
    handleNextMusic,
    handleLoop,
    handleSeek,
  } = usePlayer();
  const { colors } = useTheme();

  return (
    <>
      <Header title="Tocando agora" showBack />
      <Container
        start={{ x: 0.5, y: 0.7 }}
        colors={[colors.background, colors.primary]}
      >
        <MusicInfosContainer>
          <MusicCoverContainer>
            <MusicCover
              resizeMode="contain"
              source={
                currentMusic.cover
                  ? { uri: currentMusic.cover }
                  : require("../../assets/artwork.png")
              }
            />
          </MusicCoverContainer>
          <MusicName numberOfLines={1}>{currentMusic?.name}</MusicName>
          <MusicArtist>{currentMusic.artist}</MusicArtist>
        </MusicInfosContainer>
        <MusicControllersContainer>
          <MusicSeekContainer>
            <MusicSeek
              minimumValue={0}
              maximumValue={useProgress().duration}
              value={useProgress().position}
              thumbTintColor={colors.secondary}
              minimumTrackTintColor={colors.secondary}
              maximumTrackTintColor={colors.heading}
              onSlidingComplete={handleSeek}
            />
            <MusicDurationContainer>
              <MusicDuration>
                {secondsToTime(useProgress(800).position)}
              </MusicDuration>
              <MusicDuration>
                {secondsToTime(useProgress().duration)}
              </MusicDuration>
            </MusicDurationContainer>
          </MusicSeekContainer>
          <MusicControllers>
            <MusicControllerButton onPress={handlePrevMusic}>
              <MaterialIcons
                name="skip-previous"
                size={45}
                color={colors.black}
              />
            </MusicControllerButton>
            <MusicControllerButton onPress={playAndPauseMusic}>
              <MaterialIcons
                name={isPlaying ? "pause-circle-filled" : "play-circle-fill"}
                size={65}
                color={colors.primary}
              />
            </MusicControllerButton>
            <MusicControllerButton onPress={handleNextMusic}>
              <MaterialIcons name="skip-next" size={45} color={colors.black} />
            </MusicControllerButton>
          </MusicControllers>
        </MusicControllersContainer>
        <MusicExtraControllersContainer>
          <MusicExtraControllerButton onPress={handleLoop}>
            <MaterialIcons
              name="loop"
              size={25}
              color={isLooped ? colors.secondary : colors.black}
            />
          </MusicExtraControllerButton>
          <MusicExtraControllerButton onPress={handleMute}>
            <MaterialIcons
              name={isMuted ? "volume-off" : "volume-up"}
              size={25}
              color={colors.black}
            />
          </MusicExtraControllerButton>
        </MusicExtraControllersContainer>
      </Container>
    </>
  );
};

export default MusicPlayer;
