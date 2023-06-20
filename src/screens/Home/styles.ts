import styled from "styled-components/native";

export const Container = styled.View`
  position: relative;
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  padding: 12px;
`;
