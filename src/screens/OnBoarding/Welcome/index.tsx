import { useNavigation } from "@react-navigation/native";
import React from "react";
import Button from "../../../components/Button";
import { usePersistedState } from "../../../hooks/usePersistedState";
import {
  Animation,
  AnimationContainer,
  Container,
  ContentContainer,
  Subtitle,
  Title,
} from "./styles";

const Welcome: React.FC = () => {
  const navigation = useNavigation()

  const handleStart = () => {
    navigation.navigate("Permissions")
  }

  return (
    <Container>
      <AnimationContainer>
        <Animation
          source={require("../../../assets/speakers-music.json")}
          loop={false}
          autoPlay
        />
      </AnimationContainer>
      <ContentContainer>
        <Title>Bem-vindo ao Soundfy!</Title>
        <Subtitle>
          Ouça suas músicas favoritas em qualquer lugar de forma simples e
          fácil!
        </Subtitle>
      </ContentContainer>
        <Button content="Vamos começar!" onPress={handleStart} />
    </Container>
  );
};

export default Welcome;
