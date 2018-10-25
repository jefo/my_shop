import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';
import { isFunction, merge } from 'lodash';

export const withForm = () => BaseComponent => props =>
  compose(
    withState('values', 'setValues', {
      [props.name]: {},
    }),
    withHandlers({
      handleChange: ({ setValues, values, onChange }) => e => {
        e.preventDefault();
        const { name, value } = e.currentTarget;
        console.log(`changed ${props.name}.${name}`, values[props.name][name]);
        setValues(
          merge({}, values, {
            [props.name]: {
              [name]: value,
            },
          }),
        );
        if (isFunction(onChange)) {
          onChange({ [name]: value });
        }
      },
      handleSubmit: ({ values, onSubmit }) => e => {
        e.preventDefault();
        if (onSubmit) {
          onSubmit(values[props.name]);
        }
      },
    }),
  )(BaseComponent);

const enhance = compose(withForm());

const Form = (
  { handleSubmit, handleChange, children }, // eslint-disable-line
) => (
  <form onSubmit={handleSubmit} noValidate autoComplete="off">
    {props => children({ ...props, onChange: handleChange })}
  </form>
);

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default enhance(Form);
