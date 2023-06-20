import React from "react";
import Main from "../../components/Home/Main";
import Header from "../../components/Header";
import MiniPlayer from "../../components/MiniPlayer";
import { useTheme } from "styled-components";
import { Container } from "./styles";

const Home: React.FC = () => {
  const { colors } = useTheme();

  return (
    <>
      <Header>
      </Header>
      <Container>
        <Main />
      </Container>
      <MiniPlayer />
    </>
  );
};

export default Home;
