import styled from 'styled-components/native';
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import fonts from '../../styles/fonts';

export const Container = styled.View`
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  margin-top: ${getStatusBarHeight(true)}px;
  height: 60px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  z-index: 5;
`;

export const HeaderContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const HeaderTitle = styled.Text`
  font-family: ${fonts.text};
  font-size: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary};
`

export const HeaderButton = styled.TouchableOpacity`
  margin: 0px 8px;
`

export const LeftSideContainer = styled.View`
  position: absolute;
  left: 0;
  margin-left: 12px;
`

export const RightSideContainer = styled.View`
  position: absolute;
  flex-direction: row;
  margin-right: 12px;
  right: 0;
`

