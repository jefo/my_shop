import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import {
  compose,
  withState,
  withHandlers,
  renderComponent,
  mapProps,
  toClass,
} from 'recompose';
import { isFunction, merge } from 'lodash';

const enhance = compose(
  withState('values', 'setValues', {}),
  withHandlers({
    handleChange: props => e => {
      e.preventDefault();
      const { setValues, values, onChange } = props;
      const { name, value } = e.currentTarget;
      console.log(`changed "${name}"`, values[name]);
      setValues(
        merge({}, values, {
          [name]: value,
        }),
      );
      if (isFunction(onChange)) {
        onChange({ [name]: value });
      }
    },
    handleSubmit: ({ values, onSubmit }) => e => {
      e.preventDefault();
      if (onSubmit) {
        onSubmit(values);
      }
    },
    handleReset: ({ setValues, onReset, history }) => e => {
      setValues({});
      if (onReset) {
        onReset(e, history);
      }
    },
  }),
);

const Form = (
  { handleSubmit, handleChange, handleReset, children }, // eslint-disable-line
) => (
  <form
    onSubmit={handleSubmit}
    onReset={handleReset}
    noValidate
    autoComplete="off"
  >
    {React.Children.map(children, child =>
      React.cloneElement(child, { onChange: handleChange }),
    )}
  </form>
);

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default enhance(Form);
