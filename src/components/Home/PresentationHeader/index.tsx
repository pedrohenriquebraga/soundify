import React from "react";
import {
  HeaderContainer,
  HeaderTitleContainer,
  HeaderTitle,
  HeaderAnimationContainer,
  HeaderAnimation,
} from "./styles";

const PresentationHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderTitleContainer>
        <HeaderTitle>
          Olá,
          {"\n"}O que vamos ouvir?
        </HeaderTitle>
      </HeaderTitleContainer>
      <HeaderAnimationContainer>
        <HeaderAnimation
          source={require("../../../assets/astronaut-music.json")}
          autoPlay
          loop
        />
      </HeaderAnimationContainer>
    </HeaderContainer>
  );
};

export default PresentationHeader;
