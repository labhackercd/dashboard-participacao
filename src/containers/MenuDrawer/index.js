import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { toolsListItens } from './listItems';

import Box from '@material-ui/core/Box';

import AudienciasList from './ToolsList/audiencias_list'
import EDemocraciaList from './ToolsList/eDemocracia_list'
import EnquetesList from './ToolsList/enquetes_list'
import PautaList from './ToolsList/pauta_list'
import PlenarinhoList from './ToolsList/plenarinho_list'
import WikilegisList from './ToolsList/wikilegis_list'

import NestedToolListItem from './listItemComponent'

import PhoneIcon from '@material-ui/icons/Phone';
import ListIcon from "@material-ui/icons/List";
import AudienciasLogo from './icons/audiencias-icone.svg'
import eDemocraciaLogo from './icons/e-Democracia.svg'
import PautaLogo from './icons/pauta-icone.svg'
import AssignmentIcon from '@material-ui/icons/Assignment';
import WikilegisLogo from './icons/logo-wikilegis-icone.svg'

import logo from '../../camara_logo.png'

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  sideBarIcons:{
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  },
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  padding: theme.spacing(1),
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const toolsInfo={

    audiencias:{
      icon: false,
      icon_svg: AudienciasLogo,
      title:"Audiências",
      pageisActive:{
        chart:true,
        report:true,
        analytics:true,
      },
      url:{
        chart:"/audiencias-graficos",
        report:"/audiencias-relatorios",
        analytics:"/audiencias-analytics"
      }
    },
    eDemocracia:{
      icon: false,
      icon_svg: eDemocraciaLogo,
      title:"Portal e-Democracia",
      pageisActive:{
        chart:true,
        report:true,
        analytics:true,
      },
      url:{
        chart:"/edemocracia-graficos",
        report:"/edemocracia-relatorios",
        analytics:"/edemocracia-analytics"
      }
    },
    enquetes:{
      icon: <ListIcon></ListIcon>,
      title:"Enquetes",
      pageisActive:{
        chart:true,
        report:true,
        analytics:true,
      },
      url:{
        chart:"/enquetes-graficos",
        report:"/enquetes-relatorios",
        analytics:"/enquetes-analytics"
      }
    },
    pauta:{
      icon: false,
      icon_svg: PautaLogo,
      title:"Pauta Participativa",
      pageisActive:{
        chart:true,
        report:true,
        analytics:true,
      },
      url:{
        chart:"/pauta-graficos",
        report:"/pauta-relatorios",
        analytics:"/pauta-analytics"
      }
    },
    plenarinho:{
      icon: <AssignmentIcon></AssignmentIcon>,
      title:"Plenarinho",
      pageisActive:{
        chart:false,
        report:false,
        analytics:false,
      },
      url:{
        chart:"",
        report:"",
        analytics:""
      }
    },
    wikilegis:{
      icon: false,
      icon_svg: WikilegisLogo,
      title:"Wikilegis",
      pageisActive:{
        chart:true,
        report:true,
        analytics:true,
      },
      url:{
        chart:"/wikilegis-graficos",
        report:"/wikilegis-relatorios",
        analytics:"/wikilegis-analytics"
      }
    },
    zero800:{
      icon: <PhoneIcon></PhoneIcon>,
      title:"Disque Câmara",
      pageisActive:{
        chart:false,
        report:false,
        analytics:false,
      },
      url:{
        chart:"/0800-graficos",
        report:"/0800-relatorios",
        analytics:"/0800-analytics"
      }
    },
}

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
            <List>
            {toolsListItens}
            </List>
            <Divider />
            
            <NestedToolListItem className={classes.sideBarIcons} info={toolsInfo.zero800}></NestedToolListItem>
            <NestedToolListItem className={classes.sideBarIcons} info={toolsInfo.audiencias}></NestedToolListItem>
            <NestedToolListItem className={classes.sideBarIcons} info={toolsInfo.eDemocracia}></NestedToolListItem>
            <NestedToolListItem className={classes.sideBarIcons} info={toolsInfo.enquetes}></NestedToolListItem>
            <NestedToolListItem className={classes.sideBarIcons} info={toolsInfo.wikilegis}></NestedToolListItem>
            <NestedToolListItem className={classes.sideBarIcons} info={toolsInfo.pauta}></NestedToolListItem>
            <NestedToolListItem className={classes.sideBarIcons} info={toolsInfo.plenarinho}></NestedToolListItem>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Box margin={1}>
          <Container maxWidth="100%" className={classes.container}>
              {props.children}
          </Container>
        </Box>

      </main>
    </div>
  );
}
