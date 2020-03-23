import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PhoneIcon from '@material-ui/icons/Phone';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ListIcon from '@material-ui/icons/List';

import { Link } from "react-router-dom";


export const toolsListItens = (
  <div>
    <ListSubheader inset>Gráficos</ListSubheader>

    <ListItem button component={Link}
      to={"/"}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Página Inicial" />
    </ListItem>

    <ListItem button component={Link}>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Enquetes" />
    </ListItem>

    <ListItem button component={Link}>
      <ListItemIcon>
        <PhoneIcon />
      </ListItemIcon>
      <ListItemText primary="0800" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <QuestionAnswerIcon />
      </ListItemIcon>
      <ListItemText primary="Plenarinho" />
    </ListItem>

  </div>
);
