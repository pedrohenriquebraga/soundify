import styled from "styled-components/native";
import fonts from "../../styles/fonts";

export const MiniPlayerContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.light_shape};
  position: absolute;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 97%;
  padding: 10px;
  margin: 20px auto;
  border-radius: 12px;
  bottom: 0;
  left: 5px;
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
  width: 60px;
  height: 60px;
  border-radius: 12px;
`;

export const MiniPlayerContentContainer = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const MiniPlayerTitle = styled.Text`
  font-family: ${fonts.text};
  font-size: 10px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const MiniPlayerMusicName = styled.Text`
  font-family: ${fonts.name};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.black};
`;

export const MiniPlayerActionContainer = styled.View`
  flex-direction: row;
`;

export const MiniPlayerActionButton = styled.TouchableOpacity`
  margin-right: 10px;
`;
