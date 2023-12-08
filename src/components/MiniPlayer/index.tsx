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
  MiniPlayerTitle,
} from "./styles";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { usePlayer } from "../../contexts/player";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, TouchableOpacity } from "react-native";

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
    <MiniPlayerContainer
      start={{ x: 0.3, y: 0 }}
      end={{ x: 1.8, y: 0.5 }}
      colors={[colors.light_shape, colors.primary]}
      style={{ flex: 1 }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
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
              size={25}
              color={colors.black}
            />
          </MiniPlayerActionButton>
          <MiniPlayerActionButton onPress={playAndPauseMusic}>
            <MaterialIcons
              name={isPlaying ? "pause" : "play-arrow"}
              size={25}
              color={colors.black}
            />
          </MiniPlayerActionButton>
          <MiniPlayerActionButton onPress={handleNextMusic}>
            <MaterialIcons name="skip-next" size={25} color={colors.black} />
          </MiniPlayerActionButton>
        </MiniPlayerActionContainer>
      </TouchableOpacity>
    </MiniPlayerContainer>
  );
};

export default React.memo(MiniPlayer);
