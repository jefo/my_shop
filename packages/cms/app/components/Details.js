import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Details = ({ title, description, price }) => (
  <Paper>
    <Typography variant="h4" gutterBottom>
      {title}
    </Typography>
    {price && (
      <Typography variant="subtitle2" compomnent="p">
        {price}
      </Typography>
    )}
    {description && (
      <Typography variant="body1" compomnent="p">
        {description}
      </Typography>
    )}
  </Paper>
);

Details.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  price PropTypes.string,
};

export default Details;
