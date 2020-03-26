import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { Link } from "react-router-dom";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';

import GoogleAnalyticsLogo from '../icons/google_analytics-icon.svg'
import TimelineIcon from '@material-ui/icons/Timeline';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PhoneIcon from '@material-ui/icons/Phone';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Zero800List() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"

      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <Icon>
             <PhoneIcon></PhoneIcon>
          </Icon>
        </ListItemIcon>
        <ListItemText primary="0800" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        <ListItem disabled={true} button component={Link} to={"/0800-graficos"} className={classes.nested}>
            <ListItemIcon>
              <Icon>
                <TimelineIcon></TimelineIcon>
              </Icon>
            </ListItemIcon>
            <ListItemText primary="Gráficos" />
          </ListItem>

          
          <ListItem disabled={true} button component={Link} to={"/0800-relatorios"} className={classes.nested}>
            <ListItemIcon>
              <Icon>
                <AssignmentIcon></AssignmentIcon>
              </Icon>
            </ListItemIcon>
            <ListItemText primary="Relatórios" />
          </ListItem>

          
          <ListItem disabled={true} button component={Link} to={"/0800-analytics"}  className={classes.nested}>
            <ListItemIcon>
              <Icon>
                <img alt="Ícone Wikilegis Analytics" src={GoogleAnalyticsLogo} height={22} width={22}/>
              </Icon>
            </ListItemIcon>
            <ListItemText primary="Google Analytics" />
          </ListItem>

        </List>
      </Collapse>
    </List>
  );
}