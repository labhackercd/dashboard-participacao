import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/Group';

import { Link } from "react-router-dom";


export const mainListItems = (
  <div>
    <ListSubheader inset>Gráficos</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button component={Link} 
          to={"/statitics"}>
      <ListItemIcon>
        <BarChartIcon/>
      </ListItemIcon>
      <ListItemText primary="Estatísticas 1" />
    </ListItem>

    <ListItem button >
      <ListItemIcon>
        <ReportProblemIcon/>
      </ListItemIcon>
      <ListItemText primary="Estatísticas 2" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <SettingsIcon/>
      </ListItemIcon>
      <ListItemText primary="Estatísticas 3"/>
    </ListItem>

  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Relatórios</ListSubheader>
    <ListItem button component={Link} 
      to={"/list-students"}>
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="Relatório 1" />
    </ListItem>

    <ListItem button component={Link} to={"/list-admins"}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Relatório 2"/>
    </ListItem>

    <ListItem button component={Link} to={"/register-admin"}>
      <ListItemIcon>
        <PersonAddIcon />
      </ListItemIcon>
      <ListItemText primary="Relatório 3" />
    </ListItem>
  </div>
);

export const thirdListItems = (
    <div>
      <ListSubheader inset>Para Desenvolvedores</ListSubheader>
      <ListItem button  component="">
        <ListItemIcon>
            <ExitToAppIcon/>
        </ListItemIcon>
          <ListItemText primary="API's" />
      </ListItem>
  
    </div>
  );