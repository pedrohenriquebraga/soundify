import styled from 'styled-components/native';
import LottieView from "lottie-react-native";
import fonts from '../../../styles/fonts';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;

export const AnimationContainer = styled.View`
  width: 100%;
  height: 400px;
  margin-bottom: -70px;
`

export const Animation = styled(LottieView)``;

export const ContentContainer = styled.View`
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  font-family: ${fonts.heading};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Subtitle = styled.Text`
  font-family: ${fonts.subtitle};
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  margin: 20px 0px;
`
