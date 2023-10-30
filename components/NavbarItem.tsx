import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { SvgIconComponent } from "@mui/icons-material";

interface NavbarItemProps {
  label: string;
  link?: string;
  icon?: SvgIconComponent;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, link, icon }) => {
  // router
  const router = useRouter();
  const isActive = router.pathname === link;

  // color pick
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        color: `${isActive ? primaryColor : ""}`,
        transition: "all 300ms",
        fontSize: "14.5px",
        "&:hover": {
          color: primaryColor,
          cursor: "pointer",
        },
      }}
      onClick={() => router.push(`${link}`)}
    >
      {icon && (
        <IconButton
          sx={{
            marginRight: "5px",
            textAlign: "center",
            color: `${isActive ? primaryColor : ""}`,
            transition: "all 300ms",
            fontSize: "24px",
            width: "36px",
            "&:hover": {
              color: primaryColor,
            },
          }}
        >
          {React.createElement(icon)}
        </IconButton>
      )}
      {label}
    </Box>
  );
};

export default NavbarItem;
