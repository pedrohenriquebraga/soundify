import "styled-components/native"
import ThemeModel from "../styles/themes/dark"

export type ThemeType = typeof ThemeModel

declare module "styled-components/native" {
  export interface DefaultTheme extends ThemeType {}
}
