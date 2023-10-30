import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import React, { ReactNode, useMemo } from "react";
import { themeSettings } from "@/themes/theme";

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const modeString = useSelector((state: RootState) => state.mode);
  const mode: PaletteMode = modeString === "dark" ? "dark" : "light";
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
