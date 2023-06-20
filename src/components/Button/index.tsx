import React, { useMemo } from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { ButtonText, ButtonContainer, Gradient } from "./styles";
import { useTheme } from "styled-components";

interface ButtonProps extends RectButtonProps {
  content: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  content,
  textColor,
  enabled,
  ...rest
}) => {
  const { colors } = useTheme();
  const gradientColors = useMemo(() => {
    return enabled || enabled == undefined
      ? [colors.primary, colors.secondary]
      : ["#555", "#888"];
  }, [enabled]);

  return (
    <Gradient colors={gradientColors} start={{ x: 0.7, y: 0.5 }}>
      <ButtonContainer enabled={enabled} {...rest}>
        <ButtonText color={textColor}>{content}</ButtonText>
      </ButtonContainer>
    </Gradient>
  );
};

export default Button;
