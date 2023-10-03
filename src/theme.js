import { makeTheme } from "dripsy";
export const theme = makeTheme({
  colors: {
    $primary: "#0072B1",
    $secondary: "#1257BE",
    $white: "#FFFFFF",
    $black: "#000000",
    $background: "#F0FBFF",
    $text: "#0F2030",
  },
  space: {
    $none: 0,
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 16,
    $4: 32,
    $5: 64,
    $6: 128,
    $7: 256,
    $8: 512,
  },
  types: {
    onlyAllowThemeValues: {
      space: "always",
    },
  },
  linearGradients: {
    light: ["#85D0ED", "#75CCEB"],
  },
});
