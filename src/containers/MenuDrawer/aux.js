import React from 'react';
import {Link} from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import ForumIcon from '@material-ui/icons/Forum';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import TuneIcon from '@material-ui/icons/Tune';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    drawer: {
        [
            theme
                .breakpoints
                .up('sm')
        ]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        marginLeft: drawerWidth,
        [
            theme
                .breakpoints
                .up('sm')
        ]: {
            width: `calc(100% - ${drawerWidth}px)`
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [
            theme
                .breakpoints
                .up('sm')
        ]: {
            display: 'none'
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

function ResponsiveDrawer(props) {
    const {container} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen,
        setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            <List>
                <ListItem button key="1" component={Link} to={"/partner-list"}>
                    <ListItemIcon><ForumIcon/></ListItemIcon>
                    <ListItemText primary="Conversations"/>
                </ListItem>

                <ListItem button key="2" component="a" href="https://moodle.tuni.fi/">
                    <ListItemIcon><CollectionsBookmarkIcon/></ListItemIcon>
                    <ListItemText primary="Moodle"/>
                </ListItem>

                <ListItem button key="3" component={Link} to={"/edit-profile"}>
                    <ListItemIcon><TuneIcon/></ListItemIcon>
                    <ListItemText primary="Preferences"/>
                </ListItem>

                <ListItem button key="4" component={Link} to={"/browse-match"}>
                    <ListItemIcon><PeopleIcon/></ListItemIcon>
                    <ListItemText primary="Find a partner"/>
                </ListItem>

                <ListItem button key="5" component={Link} to={"/partner-list"}>
                    <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                    <ListItemText primary="Log out"/>
                </ListItem>

            </List>

        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="primary"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl'
                        ? 'right'
                        : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                        paper: classes.drawerPaper
                    }}
                        ModalProps={{
                        keepMounted: true, // Better open performance on mobile. }}>
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                        paper: classes.drawerPaper
                    }}
                        variant="permanent"
                        open>
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div>
                    {props.children}
                </div>
            </main>
        </div>
    );
}

export default ResponsiveDrawer;