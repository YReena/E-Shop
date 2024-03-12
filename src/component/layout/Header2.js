import { Mail, Notifications, Pets } from "@mui/icons-material";
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    InputBase,
    Menu,
    MenuItem,
    styled,
    Toolbar,
    Typography, Button, Link
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';
import { logout } from '../../actions/userAction';

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-around",
});

const Search = styled("div")(({ theme }) => ({
    backgroundColor: "white",
    padding: "6px 10px",
    borderRadius: theme.shape.borderRadius,
    width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "4vmax",
    [theme.breakpoints.up("sm")]: {
        display: "flex",
    },
}));

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.card);
    const { isAuthenticated, user } = useSelector((state) => state.user);

    let ele = [];
    {
        cartItems && user &&
            cartItems.forEach(element => {
                if (element.user == user.name) {
                    ele.push(element);
                }
            });
    }

    useEffect(() => {

    }, [navigate, isAuthenticated, user]);

    const [avatar, setAvatar] = useState("/Profile.png");
    return (
        <AppBar position="sticky" color='default'>
            <StyledToolbar>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
                    <img src="https://img.freepik.com/premium-vector/business-logo-template-fashion-branding-design_278222-2436.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1710115200&semt=ais" style={{ width: "65px", height: "65px" }} />
                </Typography>
                <Pets sx={{ display: { xs: "block", sm: "none" } }} />
                <Search component='div'>
                    <InputBase placeholder="Search for Products, Brands and More..." />
                </Search>

                {isAuthenticated ? (<>
                    <Icons>
                        {user && user.role === "admin" ? (<>
                            <Link variant="inherit" underline="none" component={RouterLink} sx={{ display: "flex" }} to='/admin/dashboard'>
                                    <SpaceDashboardIcon />
                                    <Typography sx={{ paddingLeft: 0.4 }}><b>Dashboard</b></Typography>
                            </Link>
                        </>) : (<></>)}

                        <Link variant="inherit" underline="none" component={RouterLink} sx={{ display: "flex" }} to='/'>
                                <HomeIcon />
                                <Typography sx={{ paddingLeft: 0.4 }}><b>Home</b></Typography>

                        </Link>
                        <Link variant="inherit" underline="none" component={RouterLink} sx={{ display: "flex" }} to='/cart'>
                            <Badge badgeContent={ele.length} color="error">
                                <ShoppingCartIcon />
                                <Typography sx={{ paddingLeft: 0.4 }}><b>Cart</b></Typography>
                            </Badge>

                        </Link>
                        <Link variant="inherit" underline="none" component={RouterLink} sx={{ display: "flex" }} to='/account'>
                            <Avatar
                                src={user ?user.avtar.url: avatar} alt="Avatar Preview"
                            />
                            <Typography sx={{ paddingLeft: 0.4, paddingTop:0.7 }}><b>Profile</b></Typography>
                        </Link>

                        <Link variant="inherit" underline="none" component="button" sx={{ display: "flex" }} onClick={() => {
                            dispatch(logout());
                            navigate("/");

                        }}>
                            <ExitToAppIcon />
                            <Typography sx={{}}><b>Logout</b></Typography>
                        </Link>
                    </Icons>

                </>) : (<>
                    <Icons>

                        <Link variant="inherit" underline="none" component={RouterLink} sx={{ display: "flex" }} to='/cart'>
                            <Badge badgeContent={ele.length} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                            <Typography sx={{ paddingLeft: 0.4 }}><b>Cart</b></Typography>
                        </Link>
                        <Link variant="inherit" underline="none" component={RouterLink} sx={{ display: "flex" }} to='/login'>
                            <AccountCircle/>
                            <Typography sx={{ paddingLeft: 0.4 }}><b>Login</b></Typography>
                        </Link>
                    </Icons>

                </>)}
            </StyledToolbar>
        </AppBar>
    );
};

export default Navbar;