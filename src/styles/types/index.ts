import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    title: string;
    colors: {
      black: string;
      white: string;
      heading: string;
      background: string;
      shape: string;
      light_shape: string;
      primary: string;
      secondary: string;
    };
  }
}
