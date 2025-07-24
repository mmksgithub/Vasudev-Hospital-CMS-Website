/* eslint-disable react/prop-types */
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import "@fontsource/figtree"; 

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        fontWeight="bold"
        color={colors.gray[100]}
        mb="5px"
        fontFamily="'Figtree', sans-serif" // Figtree font added correctly
      >
        {title}
      </Typography>
      <Typography variant="h5" color="#049A9F" fontFamily="'Figtree', sans-serif" >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
