import React, { useState } from "react";
import {
  HeaderContainer,
  HeaderTitleContainer,
  HeaderTitle,
  HeaderAnimationContainer,
  HeaderAnimation,
  HeaderSectionContainer,
  HeaderSectionTitle,
  HeaderSelectorsContainer,
} from "./styles";
import { View } from "react-native";
import Radio from "../../Inputs/Radio";
import { GroupTypes } from "./types";
import { Feather } from "@expo/vector-icons";

const PresentationHeader: React.FC<{
  onChangeGroup: (value: any) => any;
}> = ({ onChangeGroup }) => {
  const [currentGroupValue, setCurrentGroupValue] = useState(GroupTypes.ALL);

  return (
    <HeaderContainer>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
      </View>
      <HeaderSectionContainer>
        <HeaderSectionTitle><Feather name="grid" size={16} /> Agrupar por</HeaderSectionTitle>
        <HeaderSelectorsContainer>
          <Radio
            currentValue={currentGroupValue}
            onChangeValue={(value) => {
              setCurrentGroupValue(value);
              onChangeGroup(value);
            }}
            buttons={[
              {
                label: "Todos",
                value: GroupTypes.ALL,
              },
              { label: "Artistas", value: GroupTypes.ARTISTS },
              { label: "Ano de lançamento", value: GroupTypes.YEAR },
            ]}
          />
        </HeaderSelectorsContainer>
      </HeaderSectionContainer>
    </HeaderContainer>
  );
};

export default PresentationHeader;
