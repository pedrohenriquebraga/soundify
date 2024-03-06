import React from "react";
import { useTheme } from "styled-components";
import {
  MiniPlayerActionButton,
  MiniPlayerActionContainer,
  MiniPlayerArtist,
  MiniPlayerContainer,
  MiniPlayerContentContainer,
  MiniPlayerCover,
  MiniPlayerCoverContainer,
  MiniPlayerLeftSide,
  MiniPlayerMusicName,
} from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { usePlayer } from "../../contexts/player";
import { TouchableOpacity } from "react-native";
import { useIsPlaying } from "react-native-track-player";

const MiniPlayer: React.FC = () => {
  const {
    playAndPauseMusic,
    handlePrevMusic,
    handleNextMusic,
    currentMusic,
  } = usePlayer();
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const { playing } = useIsPlaying()

  const handleGoMusicPlayer = async () => {
    navigation.navigate("MusicPlayer");
  };

  if (!currentMusic) return <></>;

  return (
    <MiniPlayerContainer
      start={{ x: 0.5, y: 0 }}
      end={{ x: 1.9, y: 0.3 }}
      colors={[colors.light_shape, colors.primary]}
      style={{ flex: 1 }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", padding: 5 }}
        activeOpacity={0.7}
        onPress={handleGoMusicPlayer}
      >
        <MiniPlayerLeftSide>
          <MiniPlayerCoverContainer>
            <MiniPlayerCover
              source={
                currentMusic.cover
                  ? { uri: currentMusic.cover }
                  : require("../../assets/artwork.png")
              }
            />
          </MiniPlayerCoverContainer>
          <MiniPlayerContentContainer>
            <MiniPlayerMusicName numberOfLines={1}>
              {currentMusic.name}
            </MiniPlayerMusicName>
            <MiniPlayerArtist>{currentMusic.artist}</MiniPlayerArtist>
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
              name={playing ? "pause" : "play-arrow"}
              size={30}
              color={colors.black}
            />
          </MiniPlayerActionButton>
          <MiniPlayerActionButton onPress={handleNextMusic}>
            <MaterialIcons name="skip-next" size={30} color={colors.black} />
          </MiniPlayerActionButton>
        </MiniPlayerActionContainer>
      </TouchableOpacity>
    </MiniPlayerContainer>
  );
};

export default React.memo(MiniPlayer);
