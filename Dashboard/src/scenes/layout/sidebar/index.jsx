/* eslint-disable react/prop-types */
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  DashboardOutlined,
  PeopleAltOutlined,
  ExpandMore,
  ExpandLess,
  ContactsOutlined,
  ReceiptOutlined,
  AddCircleOutline,
  ListAltOutlined,
  BarChartOutlined,
  CalendarTodayOutlined,
  DonutLargeOutlined,
  HelpOutlineOutlined,
  MapOutlined,
  MenuOutlined,
  LinkOutlined,
  DesktopMacOutlined,
  TvOutlined,
  RecentActorsOutlined,
  PhotoSizeSelectActualOutlined,
  AdUnitsOutlined,
  MedicalServicesOutlined,
} from "@mui/icons-material";
import { tokens } from "../../../theme";
import Item from "./Item";
import { ToggledContext } from "../../../App";
import logo from "../../../assets/images/vasudev-logo-rb.png";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State to handle dropdown toggle for CMS Doctors
  const [isDoctorsDropdownOpen, setIsDoctorsDropdownOpen] = useState(false);
  // State to handle dropdown toggle for CMS Gallery
  const [isGalleryDropdownOpen, setIsGalleryDropdownOpen] = useState(false);

  return (
    <Sidebar
    backgroundColor={colors.primary[990]}

      rootStyles={{
        border: 0,
        height: "100%",
        backgroundColor:"#CBF3EE",

        width: "17.5%",
        boxShadow: "5px 0 5px rgba(0, 0, 0, 0.1)",
        fontFamily: "Figtree",

      }}
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="md"
    >
      <Menu
        menuItemStyles={{
          button: { ":hover": { background: "transparent" } },
        }}
      >
        <MenuItem
          rootStyles={{
            margin: "10px 0 20px 0",
            color: colors.primary[100],          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {!collapsed && (
              <Box
              display="flex"
              alignItems="center"
              gap="12px"
              sx={{ transition: ".3s ease" }}
            >
              <Box
                component="img"
                src={logo}
                alt="Argon"
                sx={{

width: {
  xs: "150px",   // Extra small screens (mobile)
  sm: "200px",   // Small screens
  md: "210px",   // Medium screens
  mdLg: "230px", // Between Medium and Large screens
  lgSm: "250px", // Slightly smaller than Large screens
  lg: "275px",   // Medium-large screens
  lgMd: "285px", // Slightly smaller than full Large screens
  xl: "300px",   // Full Large screens
},
height: {
  xs: "50px",    // Extra small screens
  sm: "60px",    // Small screens
  md: "65px",    // Medium screens
  mdLg: "70px",  // Between Medium and Large screens
  lgSm: "72px",  // Slightly smaller than Large screens
  lg: "73px",    // Medium-large screens
  lgMd: "74px",  // Slightly smaller than full Large screens
  xl: "75px",    // Full Large screens
},
                  borderRadius: "5px",
                  marginTop: "25px",
                }}
              />
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textTransform="capitalize"
                  color= "colors.primary[100]"  
                ></Typography>
              </Box>
            )}
           
          </Box>
        </MenuItem>
      </Menu>

      {!collapsed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            mb: "25px",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              fontSize="25px"
              fontWeight="bold"
              marginTop="15px"
              color="colors.primary[100]"   
              fontFamily= "Figtree"
              >
              Anantha Vasudev Hospital 
              <hr />
            </Typography>
            <Typography
              variant="h6"
              fontWeight="500"
               color="colors.primary[100]"
            ></Typography>
          </Box>
        </Box>
      )}

      <Box mb={5} pl={collapsed ? undefined : ""}>
        <Menu
          menuItemStyles={{
            button: {
               color:colors.primary[100],
              fontSize: "18px", 
              ":hover": {
                background: "transparent",
                transition: ".4s ease",
                backgroundColor: "#a0a0a0",

              },
            },
          }}
        >
          {/* <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </IconButton> */}
          <Item
            title="Website"
            path="https://vasudevhealthcare.com"
            colors={colors}
            icon={<DesktopMacOutlined />}
          />
        </Menu>

        <Typography
          variant="h5"
          color="#333a46"
          
          sx={{ m: "15px 0 20px 33px",               color:colors.primary[100],
            fontFamily: "Figtree",
            fontSize: "20px",


          }}
        >
          {!collapsed ? "CMS  DASHBOARD" : ""}
        </Typography>

        <Menu
          menuItemStyles={{
            button: {
              fontSize: "18px",
              ":hover": {
                color:"colors.primary[100]",            transition: ".4s ease",
                backgroundColor: "#a0a0a0",

              },
            },
          }}
        >
          {/* CMS Doctors Dropdown */}
          <MenuItem
            rootStyles={{ display: "flex", justifyContent: "space-between" ,fontSize: "18px",            color: colors.primary[100],
 
            }}
            onClick={() => setIsDoctorsDropdownOpen(!isDoctorsDropdownOpen)}
            icon={<PeopleAltOutlined />}
            style={{ cursor: "pointer" }}
          >
            <Box display="flex" justifyContent="space-between" width="100"  color="colors.primary[100]"  >
              <Typography sx={{fontSize: "18px", color: colors.gray[100],             fontFamily: "Figtree",
}}> Doctors</Typography>
              <Box sx={{ ml: "auto", pl: "70px", }}>
                {isDoctorsDropdownOpen ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </Box>
            </Box>
          </MenuItem>

          {isDoctorsDropdownOpen && (
            <>
               <Menu
          menuItemStyles={{
            button: {
               color:colors.primary[100],
              fontSize: "18px", 
              ":hover": {
                background: "transparent",
                transition: ".4s ease",
                backgroundColor: "#a0a0a0",
              },
            },
          }}
        >
              <Item
                title="Add Doctors"
                path="/form" // Make sure the path matches your routing
                colors={colors}
                icon={<AddCircleOutline />}
              /></Menu>

              <Menu
          menuItemStyles={{
            button: {
               color:colors.primary[100],
              fontSize: "18px", 
              ":hover": {
                background: "transparent",
                transition: ".4s ease",
                backgroundColor: "#a0a0a0",
              },
            },
          }}
        >
              <Item
                title="View Doctors"
                path="/view-doctors" // Assuming you have a path for viewing doctors
                colors={colors}
                icon={<ListAltOutlined />}
              />
              </Menu>
            </>
          )}

          {/* CMS Gallery Dropdown */}
          <MenuItem
            rootStyles={{ display: "flex", justifyContent: "space-between" ,color: colors.gray[100],}}
            onClick={() => setIsGalleryDropdownOpen(!isGalleryDropdownOpen)}
            icon={<PhotoSizeSelectActualOutlined/>} // You can replace this with a relevant icon
            style={{ cursor: "pointer" }}
          >
            <Box display="flex" justifyContent="space-between" width="100%" >
              <Typography sx={{fontSize: "18px",color: colors.gray[100],            fontFamily: "Figtree",
}}> Gallery</Typography>
              <Box sx={{ ml: "auto", pl: "78px" }}>
                {isGalleryDropdownOpen ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </Box>
            </Box>
          </MenuItem>

          {isGalleryDropdownOpen && (
            <>
                 <Menu
          menuItemStyles={{
            button: {
               color:colors.primary[100],
              fontSize: "18px", 
              ":hover": {
                background: "transparent",
                transition: ".4s ease",
                backgroundColor: "#a0a0a0",
              },
            },
          }}
        >
 <Item
  title="Add Photos"
  path="/add-photos" // Path for adding photos
  colors={colors}
  icon={<AddCircleOutline />} // Set icon color
/>
</Menu>

<Menu
          menuItemStyles={{
            button: {
               color:colors.primary[100],
              fontSize: "18px", 
              ":hover": {
                background: "transparent",
                transition: ".4s ease",
                backgroundColor: "#a0a0a0",
              },
            },
          }}
        >
              <Item
                title="View Photos"
                path="/view-photos" // Path for viewing photos
                colors={colors}
                icon={<ListAltOutlined />}
              />
              </Menu>
            </>
          )}

<Menu
          menuItemStyles={{
            button: {
               color:colors.primary[100],
              fontSize: "18px", 
              ":hover": {
                background: "transparent",
                transition: ".4s ease",
                backgroundColor: "#a0a0a0",
              },
            },
          }}
        >
          <Item
            title="AboutUs"
            path="/about-us"
            colors={colors}
            icon={<ContactsOutlined />}
          />
          </Menu>
          <Menu
          menuItemStyles={{
            button: {
               color:colors.primary[100],
              fontSize: "18px", 
              ":hover": {
                background: "transparent",
                transition: ".4s ease",
                backgroundColor: "#a0a0a0",
              },
            },
          }}
        >
          <Item
            title="ContactUs"
            path="/contact-us"
            colors={colors}
            icon={<RecentActorsOutlined />}
          />           
          </Menu>
          <Menu
          menuItemStyles={{
            button: {
               color:colors.primary[100],
              fontSize: "18px", 
              ":hover": {
                background: "transparent",
                transition: ".4s ease",
                backgroundColor: "#a0a0a0",
              },
            },
          }}
        >
<Item   title="Flash Banner"
            path="/hero"
            colors={colors}
            icon={<AdUnitsOutlined />}
          />
        </Menu>

        <Menu
          menuItemStyles={{
            button: {
               color:colors.primary[100],
              fontSize: "18px", 
              ":hover": {
                background: "transparent",
                transition: ".4s ease",
                backgroundColor: "#a0a0a0",
              },
            },
          }}
        >
<Item   title="Services"
            path="/services"
            colors={colors}
            icon={<MedicalServicesOutlined />}
          />
        </Menu>

        <Menu
          menuItemStyles={{
            button: {
               color:colors.primary[100],
              fontSize: "18px", 
              ":hover": {
                background: "transparent",
                transition: ".4s ease",
                backgroundColor: "#a0a0a0",
              },
            },
          }}
        >
<Item   title="Departments"
            path="/departments"
            colors={colors}
            icon={<DashboardOutlined />}
          />
        </Menu>

        <Menu
          menuItemStyles={{
            button: {
               color:colors.primary[100],
              fontSize: "18px", 
              ":hover": {
                background: "transparent",
                transition: ".4s ease",
                backgroundColor: "#a0a0a0",
              },
            },
          }}
        >
<Item   title="Social Links"
            path="/links"
            colors={colors}
            icon={<LinkOutlined/>}
          />
        </Menu>



        </Menu>
      </Box>
    </Sidebar>
  );
};

export default SideBar;
