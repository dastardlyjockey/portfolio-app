import React, { useEffect, useRef, useState } from "react";
import FlexBetween from "@/components/FlexBetween";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setMode } from "@/state";
import {
  DarkMode,
  LightMode,
  Menu,
  Home,
  Info,
  Description,
  Email,
  Work,
  Apps,
} from "@mui/icons-material";
import NavbarItem from "@/components/NavbarItem";

const Navbar = () => {
  // color pick
  const theme = useTheme();
  const bgAlt = theme.palette.background.paper;
  const bgMain = theme.palette.background.default;
  const primaryColor = theme.palette.primary.main;
  // @ts-ignore
  const dark = theme.palette?.neutral.dark;

  //Media Query
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isTablet = useMediaQuery("(max-width: 800px)");
  const isMobile = useMediaQuery("(max-width: 480px)");

  //redux
  const dispatch = useDispatch();

  //use state
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  //close mobile navigation
  // Ref for the mobile navigation
  const mobileNavRef = useRef<HTMLDivElement | null>(null);

  // Function to close mobile navigation
  const closeMobileNav = () => {
    setIsMobileMenuToggled(false);
  };

  // Effect to add click event listener to close mobile nav when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(e.target as Node)
      ) {
        closeMobileNav();
      }
    };

    // Add event listener when mobile navigation is open
    if (!isNonMobileScreens && isMobileMenuToggled) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      // Remove event listener when mobile navigation is closed
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      // Clean up the event listener
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMobileMenuToggled]);

  return (
    <>
      <FlexBetween padding={"1rem 6%"} bgcolor={bgAlt}>
        <Box>
          <Typography
            fontWeight={"bold"}
            fontSize={"clamp(1rem, 2rem, 2.25rem)"}
            sx={{
              borderBottom: `3px solid transparent`,
              "&:hover": {
                borderBottomColor: primaryColor,
                cursor: "pointer",
              },
            }}
          >
            FO<span style={{ color: primaryColor }}>.</span>
          </Typography>
        </Box>
        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <FlexBetween gap={"3rem"}>
            {/* Icon Button */}
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <LightMode sx={{ fontSize: "20px" }} />
              ) : (
                <DarkMode sx={{ fontSize: "20px", color: dark }} />
              )}
            </IconButton>
            {/* BUTTONS */}
            <FlexBetween gap={"2rem"}>
              <NavbarItem label={"Home"} link={"/"} />
              <NavbarItem label={"About"} link={"/about"} />
              <NavbarItem label={"Project"} link={"/projects"} />
              <NavbarItem label={"Services"} link={"/services"} />
              <NavbarItem label={"Resume"} link={"/resume"} />
              <NavbarItem label={"Contact"} link={"/contact"} />
            </FlexBetween>
          </FlexBetween>
        ) : (
          <FlexBetween gap={"15px"}>
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <LightMode sx={{ fontSize: "25px" }} />
              ) : (
                <DarkMode sx={{ fontSize: "25px", color: dark }} />
              )}
            </IconButton>
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Menu sx={{ fontSize: "25px" }} />
            </IconButton>
          </FlexBetween>
        )}
        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            bgcolor={bgMain}
            position={"fixed"}
            right={0}
            bottom={0}
            height={"100%"}
            width={isMobile ? "63%" : isTablet ? "55%" : "50%"}
            zIndex={10}
            ref={mobileNavRef}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"1rem"}
              marginTop={"84px"}
              padding={"10px 0"}
            >
              <NavbarItem label={"Home"} link={"/"} icon={Home} />
              <NavbarItem label={"About"} link={"/about"} icon={Info} />
              <NavbarItem label={"Project"} link={"/projects"} icon={Work} />
              <NavbarItem label={"Services"} link={"/services"} icon={Apps} />
              <NavbarItem
                label={"Resume"}
                link={"/resume"}
                icon={Description}
              />
              <NavbarItem label={"Contact"} link={"/contact"} icon={Email} />
            </Box>
          </Box>
        )}
      </FlexBetween>
    </>
  );
};

export default Navbar;
