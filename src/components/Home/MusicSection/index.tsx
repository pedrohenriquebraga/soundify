import React from "react";
import MusicCard from "../MusicCard";
import { IMusicData } from "../../../@types/interfaces";
import { MusicsContainer } from "./styles";

export interface IMusicSectionProps {
  content: IMusicData[];
}

const MusicSection: React.FC<IMusicSectionProps> = ({ content }) => {
  return (
    <MusicsContainer>
      {content.map((music, index) => (
        <MusicCard key={index} music={music} />
      ))}
    </MusicsContainer>
  );
};

export default React.memo(MusicSection);
