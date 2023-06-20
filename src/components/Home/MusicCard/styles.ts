import AnimatedLottieView from "lottie-react-native";
import styled from "styled-components/native";
import fonts from "../../../styles/fonts";

export const MusicButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 8px;
  flex-direction: row;
  border-radius: 12px;
  elevation: 2;
  margin-top: 10px;
`;

export const MusicContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 10px 15px 0px 5px;
`;

export const MusicCoverContainer = styled.View`
  width: 70px;
  height: 70px;
  align-items: center;
  justify-content: center;
`;

export const MusicCover = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 12px;
  margin: auto 5px;
`;

export const MusicNameContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const MusicName = styled.Text<{ isPlaying?: boolean }>`
  max-height: 40px;
  font-family: ${fonts.name};
  font-size: 12px;
  flex: 1;
  color: ${({ theme, isPlaying }) => isPlaying ? theme.colors.primary : theme.colors.black};
`;

export const MusicPlayingAnimationContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`

export const MusicPlayingAnimation = styled(AnimatedLottieView)`
  width: 25px;
  height: 25px;
`

export const MusicDuration = styled.Text`
  font-family: ${fonts.text};
  font-size: 10px;
  color: ${({ theme }) => theme.colors.heading};
  text-align: right;
  margin-top: 5px;
`;
