import React from "react";
import {
  Container,
  HeaderButton,
  HeaderContentContainer,
  HeaderTitle,
  LeftSideContainer,
  RightSideContainer,
} from "./styles";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title = "Soundfy",
  showBack,
  children,
}) => {
  const navigation = useNavigation();

  const handleGoBack = async () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Container>
      <LeftSideContainer>
        {showBack && (
          <HeaderButton onPress={handleGoBack}>
            <Feather name="arrow-left" size={24} color="#FFF" />
          </HeaderButton>
        )}
      </LeftSideContainer>
      <HeaderContentContainer>
        <HeaderTitle>{title}</HeaderTitle>
      </HeaderContentContainer>
      <RightSideContainer>{children}</RightSideContainer>
    </Container>
  );
};

export default Header;
