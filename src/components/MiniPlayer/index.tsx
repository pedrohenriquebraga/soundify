import React from "react";
import { useTheme } from "styled-components";
import {
  MiniPlayerActionButton,
  MiniPlayerActionContainer,
  MiniPlayerContainer,
  MiniPlayerContentContainer,
  MiniPlayerCover,
  MiniPlayerCoverContainer,
  MiniPlayerLeftSide,
  MiniPlayerMusicName,
  MiniPlayerTitle,
} from "./styles";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { usePlayer } from "../../contexts/player";
import { MotiView } from "moti";

const MiniPlayer: React.FC = () => {
  const {
    playAndPauseMusic,
    handlePrevMusic,
    handleNextMusic,
    currentMusic,
    isPlaying,
  } = usePlayer();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleGoMusicPlayer = async () => {
    navigation.navigate("MusicPlayer");
  };

  if (!currentMusic) return <></>;

  return (
    <MiniPlayerContainer activeOpacity={0.7} onPress={handleGoMusicPlayer}>
        <MiniPlayerLeftSide>
          <MiniPlayerCoverContainer>
            <MaterialIcons
              name="music-note"
              size={60}
              color={colors.secondary}
            />
          </MiniPlayerCoverContainer>
          <MiniPlayerContentContainer>
            <MiniPlayerTitle>
              <Feather name="music" size={10} color={colors.primary} /> Tocando
              agora...
            </MiniPlayerTitle>
            <MiniPlayerMusicName numberOfLines={1}>
              {currentMusic?.name}
            </MiniPlayerMusicName>
          </MiniPlayerContentContainer>
        </MiniPlayerLeftSide>

        <MiniPlayerActionContainer>
          <MiniPlayerActionButton onPress={handlePrevMusic}>
            <MaterialIcons
              name="skip-previous"
              size={30}
              color={colors.black}
            />
          </MiniPlayerActionButton>
          <MiniPlayerActionButton onPress={playAndPauseMusic}>
            <MaterialIcons
              name={isPlaying ? "pause" : "play-arrow"}
              size={30}
              color={colors.black}
            />
          </MiniPlayerActionButton>
          <MiniPlayerActionButton onPress={handleNextMusic}>
            <MaterialIcons name="skip-next" size={30} color={colors.black} />
          </MiniPlayerActionButton>
        </MiniPlayerActionContainer>
    </MiniPlayerContainer>
  );
};

export default React.memo(MiniPlayer);
