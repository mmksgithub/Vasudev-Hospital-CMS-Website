/* eslint-disable react/prop-types */
import { MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

const Item = ({ title, path, icon }) => {
  const location = useLocation();
  return (
    <MenuItem
    component={<Link to={path} />}
    to={path}
    icon={icon}
    rootStyles={{
     
      color: path === location.pathname ? "#003333" : "#000000", // Default color when not active
      backgroundColor: path === location.pathname ? "#41A9B5" : "transparent", // Set background color when active
     
    }}
  >
    {title}
  </MenuItem>
  
  );
};

export default Item;
