import React, { useMemo } from "react";
import MusicSection from "../MusicSection";
import PresentationHeader from "../PresentationHeader";
import { Feather } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { usePlayer } from "../../../contexts/player";
import { SectionTitle } from "./styles";
import Loading from "../../Loading";

interface IPageSection {
  key: string;
  isTitle?: boolean;
  render: () => JSX.Element;
}

const Main: React.FC = () => {
  const {
    allMusics,
    currentMusic,
    hasMoreMusics,
    fetchingMusics,
    getMoreMusics,
  } = usePlayer();

  const { data, indices } = useMemo(() => {
    const data: IPageSection[] = [
      {
        key: "HEADER",
        render: () => <PresentationHeader />,
      },
      {
        key: "ALL_MUSICS",
        isTitle: true,
        render: () => (
          <SectionTitle>
            <Feather name="list" size={16} /> Todas as músicas
          </SectionTitle>
        ),
      },
      {
        key: "ALL_MUSICS_LIST",
        render: () => <MusicSection content={allMusics} />,
      },
    ];
    const indices = [];

    data.map((item, index) => item.isTitle && indices.push(index));

    return {
      data,
      indices,
    };
  }, [allMusics]);

  return (
    <FlatList
      data={data}
      stickyHeaderIndices={indices}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: currentMusic ? 80 : 0 }}
      keyExtractor={(item) => item.key}
      ListFooterComponent={fetchingMusics && hasMoreMusics && <Loading />}
      renderItem={({ item }) => item.render()}
      onEndReached={getMoreMusics}
      onEndReachedThreshold={0.5}
    />
  );
};

export default Main;
