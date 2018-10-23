import React from 'react';
// import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Form from '../../components/Form';

const Details = ({ save }) => (
  <Paper>
    <Form onSubmit={save} />
  </Paper>
);

Details.propTypes = {};

export default Details;
