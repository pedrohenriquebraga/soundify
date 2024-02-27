import React, { useMemo, useState } from "react";
import MusicSection from "../MusicSection";
import PresentationHeader from "../PresentationHeader";
import { Feather } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { usePlayer } from "../../../contexts/player";
import { SectionTitle } from "./styles";
import Loading from "../../Loading";
import { GroupTypes } from "../PresentationHeader/types";

interface IPageSection {
  key: string;
  isTitle?: boolean;
  render: () => JSX.Element;
}

const Main: React.FC = () => {
  const { allMusics, currentMusic, fetchingMusics, getMoreMusics } =
    usePlayer();
  const [currentGroup, setCurrentGroup] = useState(GroupTypes.ALL);
  const [loadingGroup, setLoadingGroup] = useState(false);

  const onChangeGroup = (group: GroupTypes) => {
    setCurrentGroup(group);
  };

  const { data, indices } = useMemo(() => {
    const data: IPageSection[] = [
      {
        key: "HEADER",
        render: () => <PresentationHeader onChangeGroup={onChangeGroup} />,
      },
    ];

    setLoadingGroup(true);

    if (currentGroup === GroupTypes.ALL) {
      data.push({
        key: "ALL_MUSICS",
        isTitle: true,
        render: () => (
          <SectionTitle>
            <Feather name="list" size={16} /> Todas as músicas
          </SectionTitle>
        ),
      });
      data.push({
        key: "ALL_MUSICS_LIST",
        render: () => <MusicSection content={allMusics} />,
      });
    } else if (currentGroup === GroupTypes.ARTISTS) {
      const sortedMusicsByArtist = {};

      allMusics.map((music) => {
        sortedMusicsByArtist[music.artist || "Desconhecido"] =
          sortedMusicsByArtist[music.artist]
            ? [...sortedMusicsByArtist[music.artist || "Desconhecido"], music]
            : [music];
      });

      Object.keys(sortedMusicsByArtist).map((key) => {
        data.push({
          key,
          isTitle: true,
          render: () => (
            <SectionTitle>
              <Feather name="user" size={16} /> {key}
            </SectionTitle>
          ),
        });
        data.push({
          key: `${key}-musics`,
          render: () => <MusicSection content={sortedMusicsByArtist[key]} />,
        });
      });
    } else if (currentGroup === GroupTypes.YEAR) {
      const sortedMusicsByYear = {};

      allMusics.map((music) => {
        sortedMusicsByYear[music.year || "Desconhecido"] =
          sortedMusicsByYear[music.year]
            ? [...sortedMusicsByYear[music.year || "Desconhecido"], music]
            : [music];
      });

      Object.keys(sortedMusicsByYear).map((key) => {
        data.push({
          key,
          isTitle: true,
          render: () => (
            <SectionTitle>
              <Feather name="calendar" size={16} /> {key}
            </SectionTitle>
          ),
        });
        data.push({
          key: `${key}-musics`,
          render: () => <MusicSection content={sortedMusicsByYear[key]} />,
        });
      });
    }

    setLoadingGroup(false);

    const indices = [];

    data.map((item, index) => item.isTitle && indices.push(index));

    return {
      data,
      indices,
    };
  }, [allMusics, currentGroup]);

  return (
    <FlatList
      data={data}
      stickyHeaderIndices={indices}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: currentMusic ? 80 : 0 }}
      keyExtractor={(item) => item.key}
      ListFooterComponent={fetchingMusics && <Loading />}
      renderItem={({ item }) => item.render()}
      onEndReached={getMoreMusics}
      onEndReachedThreshold={0.5}
    />
  );
};

export default Main;
