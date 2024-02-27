import AnimatedLottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import fonts from '../../../styles/fonts';
import { SectionTitle } from '../Main/styles';

export const HeaderContainer = styled.View`
  justify-content: space-between;
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

export const HeaderSectionContainer = styled.View``;

export const HeaderSectionTitle = styled(SectionTitle)`
  margin-left: -5px;
`;

export const HeaderSelectorsContainer = styled.View`
  margin: 15px 0px;
`;
