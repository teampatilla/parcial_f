import React, { useState } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Nav,
  Dropdown, 
  DropdownItem, 
  DropdownToggle, 
  DropdownMenu,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import Cookies from "universal-cookie";

const NavMenu = () => {
  const cookies = new Cookies();
  const usr = cookies.get("form");
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    cookies.remove("form", { path: "/" });
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
        <header>
        
      

      <Navbar className="navbar-expand-sm navbar-toggleable-sm box-shadow mb-3">
        <Container>
          <NavbarBrand tag={Link} className="text-light" to="/">
            Submit Service
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse
            className="d-sm-inline-flex flex-sm-row-reverse"
            isOpen={!collapsed}
            navbar
          >
            <ul className="navbar-nav flex-grow">
           
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/Submit">
                  Submit
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/Categories">
                  Category
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/Products">
                  Product
                </NavLink>
              </NavItem>
              <NavItem>
                
        <Dropdown  isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle nav className="text-light"  >
          <img className="profilePicture" src={usr.imageUrl} alt="Avatar" width="40px" height="40px"/>
          </DropdownToggle>
          
          <DropdownMenu style={{backgroundColor:"#343a40"}}>
            <DropdownItem tag={Link} style={{color:"white"}}  className="text-down" to="/User" >
              <FontAwesomeIcon icon={faUser} >
                </FontAwesomeIcon> User
            </DropdownItem>
            <DropdownItem tag={Link} style={{color:"white"}}  className="text-down" to="/Rols"> 
              Rols
              </DropdownItem>
            <DropdownItem tag={Link}
            className="text-down"
                  style={{color:"white"}}
                  to="/"
                  onClick={() => logout()} >
<FontAwesomeIcon icon={faSignOutAlt}
></FontAwesomeIcon>

                    Logout
                    </DropdownItem>
          </DropdownMenu>
          
        </Dropdown>
      </NavItem>
              
            </ul>
          </Collapse>
        </Container>
      </Navbar>
      </header>
  );




};

export default NavMenu;
