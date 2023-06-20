import React, { useState } from "react";
import Header from "../../components/Header";
import {
  Blur,
  Container,
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
import { BlurView } from "@react-native-community/blur";
import { MotiView } from "moti";

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
      <Container>
        <Blur blurType="dark" blurAmount={7} />
        <MusicInfosContainer>
          <MusicCoverContainer>
            <MaterialIcons
              name="music-note"
              size={300}
              color={colors.secondary}
            />
          </MusicCoverContainer>
          <MusicName numberOfLines={2}>{currentMusic?.name}</MusicName>
        </MusicInfosContainer>
        <MusicControllersContainer>
          <MusicSeekContainer>
            <MusicSeek
              minimumValue={0}
              maximumValue={useProgress().duration}
              value={useProgress().position}
              thumbTintColor={colors.secondary}
              minimumTrackTintColor={colors.secondary}
              maximumTrackTintColor={colors.light_shape}
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
              color={isLooped ? colors.primary : colors.black}
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
