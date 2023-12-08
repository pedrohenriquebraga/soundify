import styled from "styled-components/native";
import fonts from "../../styles/fonts";
import { LinearGradient } from "expo-linear-gradient";

export const MiniPlayerContainer = styled(LinearGradient)`
  position: absolute;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding: 10px;
  border-radius: 30px;
  bottom: 0;
  z-index: 5;
  elevation: 3;
`;

export const MiniPlayerLeftSide = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const MiniPlayerCoverContainer = styled.View``;

export const MiniPlayerCover = styled.Image`
  width: 65px;
  height: 65px;
  border-radius: 32.5px;
`;

export const MiniPlayerContentContainer = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const MiniPlayerTitle = styled.Text`
  font-family: ${fonts.text};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2px;
`;

export const MiniPlayerMusicName = styled.Text`
  font-family: ${fonts.name};
  font-size: 15px;
  color: ${({ theme }) => theme.colors.black};
  margin-right: 10px;
`;

export const MiniPlayerArtist = styled(MiniPlayerMusicName)`
  color: ${({ theme }) => theme.colors.heading};
  font-size: 13px;
`

export const MiniPlayerActionContainer = styled.View`
  flex-direction: row;
`;

export const MiniPlayerActionButton = styled.TouchableOpacity`
  margin-right: 10px;
`;
