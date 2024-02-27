import React, { useEffect, useMemo, useState } from "react";
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
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { usePlayer } from "../../contexts/player";
import { secondsToTime } from "../../utils/time";

import imageColors from "react-native-image-colors";

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
  const [coverColor, setCoverColor] = useState(colors.secondary);
  const [playColor, setPlayColor] = useState(colors.primary);

  useEffect(() => {
    (async () => {
      if (!currentMusic.cover) return;

      const cachedColors = imageColors.cache.getItem(currentMusic.name) as any;
      if (cachedColors) {
        setCoverColor(cachedColors.average as string);
        setPlayColor(cachedColors.vibrant as string);
        return;
      }

      const coverColors = (await imageColors.getColors(currentMusic?.cover, {
        cache: true,
        fallback: colors.secondary,
        key: currentMusic.name,
        // @ts-ignore
      })) as any;

      setCoverColor(coverColors.average as string);
      setPlayColor(coverColors.vibrant as string);
    })();
  }, [currentMusic.cover, currentMusic.name]);

  return (
    <>
      <Header title="Tocando agora" showBack />
      <Container
        start={{ x: 0.5, y: 0.5 }}
        colors={[colors.background, coverColor]}
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
          <MusicName numberOfLines={1} speed={0.3} consecutive>
            {currentMusic?.name}
          </MusicName>
          <MusicArtist>{currentMusic.artist}</MusicArtist>
        </MusicInfosContainer>
        <MusicControllersContainer>
          <MusicSeekContainer>
            <MusicSeek
              minimumValue={0}
              maximumValue={useProgress().duration}
              value={useProgress().position}
              thumbTintColor={colors.primary}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.heading}
              onSlidingComplete={handleSeek}
            />
            <MusicDurationContainer>
              <MusicDuration>
                {secondsToTime(useProgress(250).position)}
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
                size={35}
                color={colors.black}
              />
            </MusicControllerButton>
            <MusicControllerButton onPress={playAndPauseMusic}>
              <MaterialIcons
                name={isPlaying ? "pause-circle-filled" : "play-circle-fill"}
                size={75}
                color={playColor}
              />
            </MusicControllerButton>
            <MusicControllerButton onPress={handleNextMusic}>
              <MaterialIcons name="skip-next" size={35} color={colors.black} />
            </MusicControllerButton>
          </MusicControllers>
        </MusicControllersContainer>
        <MusicExtraControllersContainer>
          <MusicExtraControllerButton onPress={handleLoop}>
            <MaterialIcons
              name="loop"
              size={30}
              color={isLooped ? playColor : colors.black}
            />
          </MusicExtraControllerButton>
          <MusicExtraControllerButton onPress={handleMute}>
            <MaterialIcons
              name={isMuted ? "volume-off" : "volume-up"}
              size={30}
              color={colors.black}
            />
          </MusicExtraControllerButton>
        </MusicExtraControllersContainer>
      </Container>
    </>
  );
};

export default MusicPlayer;
