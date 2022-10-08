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
