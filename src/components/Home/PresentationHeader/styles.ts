import AnimatedLottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import fonts from '../../../styles/fonts';

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
`;

export const HeaderTitleContainer = styled.View`
  justify-content: center;
`;

export const HeaderAnimationContainer = styled.View``;

export const HeaderAnimation = styled(AnimatedLottieView)`
  height: 150px;
  width: 100%;
`;

export const HeaderTitle = styled.Text`
  font-family: ${fonts.hero};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primary};
`;