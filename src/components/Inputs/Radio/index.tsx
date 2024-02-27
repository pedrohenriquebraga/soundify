import React from "react";
import { Container, RadioButtonWrapper, RadioLabel } from "./styles";
import { useTheme } from "styled-components";

interface RadioProps {
  buttons: {
    label: string;
    value: any;
  }[];
  onChangeValue: (value: any) => void;
  currentValue: any;
}

const Radio: React.FC<RadioProps> = ({
  buttons,
  onChangeValue,
  currentValue,
}) => {
  const { colors } = useTheme();

  return (
    <Container horizontal>
      {buttons.map((button, index) => (
        <RadioButtonWrapper
          key={index}
          onPress={() => onChangeValue(button.value)}
          style={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor:
              currentValue === button.value ? colors.secondary : colors.shape,
          }}
        >
          <RadioLabel>{button.label}</RadioLabel>
        </RadioButtonWrapper>
      ))}
    </Container>
  );
};

export default Radio;
