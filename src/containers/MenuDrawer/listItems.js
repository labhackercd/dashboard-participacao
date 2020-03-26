import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from "react-router-dom";


export const toolsListItens = (
  <div>
    <ListItem button component={Link}
      to={"/"}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Página Inicial" />
    </ListItem>
  </div>
);
