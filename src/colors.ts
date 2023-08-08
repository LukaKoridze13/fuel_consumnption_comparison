type Colors = {
  [key: string]: {
    dark: string;
    light: string;
  };
};

const colors: Colors = {
  blue: {
    dark: "29, 93, 155",
    light: "117, 194, 246",
  },
  black: {
    dark: "34, 40, 49",
    light: "232, 232, 232",
  },
  darkGreen: {
    dark: "14, 57, 78",
    light: "70, 139, 151",
  },
  green: {
    dark: "17, 106, 123",
    light: "194, 222, 220",
  },
  darkBlue: {
    dark: "57, 72, 103",
    light: "241, 246, 249",
  },
  blueWhite: {
    dark: "60, 72, 107",
    light: "240, 240, 240",
  },
  yellowBlue: {
    dark: "37, 43, 72",
    light: "247, 233, 135",
  },
};

export default colors;
