import styled from "styled-components/native";
import fonts from "../../../styles/fonts";

export const Container = styled.ScrollView`
  flex-direction: row;
`;

export const RadioButtonWrapper = styled.TouchableOpacity`
  margin-right: 10px;
  padding: 12px 25px;
  background-color: ${(props) => props.theme.colors.shape};
  border-radius: 25px;
`;

export const RadioLabel = styled.Text`
  color: ${(props) => props.theme.colors.black};
  font-family: ${fonts.heading};
  font-size: 13px;
  text-align: center;
`;
