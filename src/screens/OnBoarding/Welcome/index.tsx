import { useNavigation } from "@react-navigation/native";
import React from "react";
import Button from "../../../components/Button";
import {
  Animation,
  AnimationContainer,
  Container,
  ContentContainer,
  Subtitle,
  Title,
} from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";

const Welcome: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>()

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
        <Title>Bem-vindo ao Soundify!</Title>
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
