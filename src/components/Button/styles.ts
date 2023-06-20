import { LinearGradient } from 'expo-linear-gradient';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import fonts from '../../styles/fonts';

export const Gradient = styled(LinearGradient)`
  border-radius: 8px;
  width: 100%;
`

export const ButtonContainer = styled(RectButton)`
  padding: 12px;
`;

export const ButtonText = styled.Text<{ color?: string }>`
  font-family: ${fonts.text};
  font-size: 18px;
  color: ${({ color, theme }) => color || "#FFF"};
  text-align: center;
`;
