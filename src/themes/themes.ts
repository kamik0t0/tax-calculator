import { PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
    },
    components: {
        ...(mode === "light"
            ? {
                  MuiTypography: {
                      defaultProps: {
                          color: "#1E1E1E",
                      },
                  },
              }
            : {
                  MuiPaper: {
                      styleOverrides: {
                          root: {
                              background: "#1E1E1E",
                          },
                      },
                  },
                  MuiTypography: {
                      defaultProps: {
                          color: "#BCBCB2",
                      },
                  },
              }),
    },
});

// export const darkTheme = createTheme({
//     palette: {
//         mode: "dark",
//     },
//     components: {
//         MuiPaper: {
//             styleOverrides: {
//                 root: {
//                     background: "#1E1E1E",
//                 },
//             },
//         },
//         MuiInput: {
//             styleOverrides: {
//                 root: {
//                     color: "white",
//                 },
//             },
//         },
//         MuiCssBaseline: {
//             styleOverrides: `@font-face {
//                 color: "#BCBCBC"
//             }`,
//         },
//     },
// });

// export const lightTheme = createTheme({
//     palette: {
//         mode: "light",
//     },
//     components: {
//         MuiInput: {
//             styleOverrides: {
//                 root: {
//                     color: "black",
//                 },
//             },
//         },
//         MuiTypography: {
//             defaultProps: {
//                 color: "#BCBCB2",
//             },
//         },
//     },
// });
