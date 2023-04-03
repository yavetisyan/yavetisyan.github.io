import React, {useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {Link, NavLink, useNavigate} from "react-router-dom";
//import logo from "./logo.png";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {removeUser, selectUserCart, selectUserId, setCategoriesName} from "../store/slices/userSlices";
import {signOut} from "firebase/auth";
import {makeStyles} from "@mui/styles";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import {auth} from "../firebase";
import {adminPages, pages} from "../utilites/navbarNames";

const useStyles = makeStyles({
  button: {
    display: "block",
    color: "#fff",
    textDecoration: "none",
    fontStyle: "capitalize",
    fontWeight: "lighter",

    "&:hover": {
      fontWeight: "bold",
    },
  },
  active: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "all .3s",
  },
  link: {
    color: "#ababab",
    textDecoration: "none",
    transition: "all .3s",
  },
  logo: {
    maxWidth: "80px",
    alignItems: "center",
    justifyContent: "flex-end",
    display: "flex",
  },
  menuItemLink: {
    textDecoration: "none",
    textTransform: "capitalize",
    color: "inherit",
  },
});

export default function Navbar() {
  // const {googleProfileImg} = useContext(AdminContext);
  // const {setGetCatName} = useContext(CategoriesContext);
  const dispatch = useDispatch()
  const classes = useStyles();
  const userId = useSelector(selectUserId);
  const navigate = useNavigate();
  const {items = []} = useSelector(selectUserCart) || {};

  const onLogoutClick = async () => {
    await signOut(auth);
    dispatch(removeUser())
    localStorage.clear();
    navigate("/");
  };


  const menuId = "primary-search-account-menu";
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const onNavToCard = () => {
    navigate("/cart");
  };

  const onAddPageName = (categoriesName) => {
    dispatch(setCategoriesName({name: categoriesName}))
  };

  return (
    <AppBar position="fixed" id="header">
      <Container maxWidth="lg">
        {/*logo*/}
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{mr: 2, display: {xs: "none", md: "flex"}}}
          >
            <Link to="/">
              <img
                src="https://dypdvfcjkqkg2.cloudfront.net/large/6619058-9743.png"
                alt="Logo"
                className={classes.logo}
              />
            </Link>
          </Typography>

          <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {xs: "block", md: "none"},
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.link} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={page.link} className={classes.menuItemLink}>
                      {page.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}
          >
            <Link to="/" className={classes.displayFlex}>
              <img
                src="https://dypdvfcjkqkg2.cloudfront.net/large/6619058-9743.png"
                alt="Logo"
                className={classes.logo}
              />
            </Link>
          </Typography>
          <Box
            sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}
            className="navMenu"
          >
            {userId === process.env.REACT_APP_ADMIN_ID ?
              adminPages.map((page) => (
                <div key={page.link}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                    }}
                    className={classes.button}
                  >
                    <NavLink
                      to={page.link}
                      className={({isActive}) =>
                        isActive ? "link_active" : "link"
                      }
                      onClick={() => onAddPageName(page.name)}
                    >
                      {page.name}
                    </NavLink>
                  </Button>
                </div>
              ))
              :
              (pages.map((page) => (
                <div key={page.link}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                    }}
                    className={classes.button}
                  >
                    <NavLink
                      to={page.link}
                      className={({isActive}) =>
                        isActive ? "link_active" : "link"
                      }
                      onClick={() => onAddPageName(page.name)}
                    >
                      {page.name}
                    </NavLink>
                  </Button>
                </div>
              )))
            }
          </Box>

          {/*ShoppingCartIcon*/}
          {userId ? (
            <Badge
              badgeContent={items.length}
              color="error"
              sx={{mr: "30px"}}
            >
              <ShoppingCartIcon
                onClick={onNavToCard}
                sx={{cursor: "pointer"}}
              />
            </Badge>
          ) : null}

          <Box sx={{flexGrow: 0, display: "flex"}}>
            {userId ? (
              <Avatar
                alt="Sharp"
                // src={
                //   googleProfileImg
                //     ? googleProfileImg
                //     : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKsnRr9lLE015lJ_Vq1zNM3MtVIi5BN9WPAw&usqp=CAU"
                // }
              />
            ) : null}

            {userId ? (
              <>
                <Button onClick={onLogoutClick} style={{color: "inherit"}}>
                  LogOut
                </Button>
              </>
            ) : (
              <Link to="sign-in" className="signInTxt">
                Sign In
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                />
                <AccountCircle/>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
