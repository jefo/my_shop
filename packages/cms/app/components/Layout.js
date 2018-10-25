import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

console.log(indigo);

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  drawerPaper: {
    position: 'relative',
    width: 240,
    backgroundColor: '#273377',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
    padding: 0,
  },
  navItemText: {
    color: '#DFE0E5',
  },
});

const Layout = ({ classes, navItems }) => (
  <div className={classes.root}>
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <List component="nav">
        {navItems.map(item => (
          <ListItem key={item.href} button component="a" href={item.href}>
            <ListItemText
              className={classes.navItemText}
              disableTypography
              primary={item.text}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Switch>
        {navItems.map(item => (
          <Route key={item.href} path={item.href} component={item.component} />
        ))}
      </Switch>
    </main>
  </div>
);

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  navItems: PropTypes.array.isRequired,
};

export default withStyles(styles)(Layout);
