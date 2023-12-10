import React from "react";
import Main from "../../components/Home/Main";
import Header from "../../components/Header";
import MiniPlayer from "../../components/MiniPlayer";
import { useTheme } from "styled-components";
import { Container } from "./styles";
import { AnimatePresence, MotiView } from "moti";

const Home: React.FC = () => {
  const { colors } = useTheme();

  return (
    <>
      <Header></Header>
      <Container>
        <Main />
      </Container>
      <AnimatePresence>
        <MotiView
          from={{ translateY: -100 }}
          animate={{ translateY: 0 }}
          transition={{ type: "timing", duration: 1000 }}
        >
          <MiniPlayer />
        </MotiView>
      </AnimatePresence>
    </>
  );
};

export default Home;
