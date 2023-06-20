import styled from "styled-components/native";
import fonts from "../../styles/fonts";
import Slider from "@react-native-community/slider"
import { BlurView } from "@react-native-community/blur";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const MusicInfosContainer = styled.View`
  padding: 12px 20px;
`;

export const MusicCoverContainer = styled.View`
  align-items: center;
  margin-top: 90px;
`;

export const MusicCover = styled.Image`
  width: 300px;
  height: 300px;
  border-radius: 12px;
`;

export const MusicName = styled.Text`
  font-family: ${fonts.heading};
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.black};
`;

export const MusicControllersContainer = styled.View`
  margin: 0 5px;
`;

export const MusicSeekContainer = styled.View`
  margin: 20px 0px;
`;

export const MusicSeek = styled(Slider)``;

export const MusicDurationContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const MusicDuration = styled.Text`
  font-size: 14px;
  font-family: ${fonts.text};
  color: ${({ theme }) => theme.colors.heading};
  margin: 0 15px;
`;

export const MusicControllers = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
`;

export const MusicControllerButton = styled.TouchableOpacity`
  margin: 20px;
`;

export const MusicExtraControllersContainer = styled.View`
  width: 100%;
  padding: 20px;
  height: 80px;
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const MusicExtraControllerButton = styled.TouchableOpacity`
  margin: 0 10px;
`;

export const Blur = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
