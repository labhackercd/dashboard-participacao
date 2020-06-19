import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from "react-router-dom";


import NestedToolListItem from './listItemComponent'
import logo from '../../camara_logo.png'
import {useStyles} from './const_info'
import {toolsInfo} from './const_info'


export default function MenuDrawer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
          <Typography component="h1" variant="h6" noWrap className={classes.title}>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}>  
          <div className={classes.toolbarIcon}>
            <img src={logo} alt="Logo Câmara dos Deputados" style={{ maxHeight: 100 , maxWidth: '90%', align:'center'}}/>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
          </div>
          
          <Box paddingTop={2}>
            <ListItem button component={Link} to={"/"}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Página Inicial" />
            </ListItem>

            <NestedToolListItem info={toolsInfo.zero800}></NestedToolListItem>
            <NestedToolListItem info={toolsInfo.audiencias}></NestedToolListItem>
            <NestedToolListItem info={toolsInfo.eDemocracia}></NestedToolListItem>
            <NestedToolListItem info={toolsInfo.enquetes}></NestedToolListItem>
            <NestedToolListItem info={toolsInfo.wikilegis}></NestedToolListItem>
            <NestedToolListItem info={toolsInfo.pauta}></NestedToolListItem>
            <NestedToolListItem info={toolsInfo.plenarinho}></NestedToolListItem>
          </Box>

      </Drawer>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Box margin={2}>
          <Container maxWidth="100%" className={classes.container}>
              {props.children}
          </Container>
        </Box>

      </main>
    </div>
  );
}
