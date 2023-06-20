import AnimatedLottieView from "lottie-react-native";
import styled from "styled-components/native";
import fonts from "../../../styles/fonts";

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
`;

export const Animation = styled(AnimatedLottieView)``;

export const ContentContainer = styled.View`
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  text-align: center;
  font-family: ${fonts.heading};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Description = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${({ theme }) => theme.colors.black};
  margin-top: 20px;
`;

export const GrantPermissionsButton = styled.TouchableOpacity`
  margin-top: 30px;
  margin-bottom: 10px;
`

export const GrantPermissionsButtonText = styled.Text`
  text-align: center;
  font-family: ${fonts.text};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.secondary};
`
