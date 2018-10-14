import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { findIndex } from 'lodash';
import { compose, withState, withHandlers, mapProps } from 'recompose';
import { Form, Field, reduxForm } from 'redux-form';
import Paper from '@material-ui/core/Paper';
import ReorderIcon from '@material-ui/icons/Reorder';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Select from 'components/Select';

const styles = theme => ({
  container: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

const enhance = formName =>
  compose(
    reduxForm({
      form: formName,
    }),
    withStyles(styles),
    withState('adding', 'setAdding', false),
    mapProps(props => {
      const fields = props.fields.map(f => {
        let component;
        switch (f.type) {
          case 'text':
            component = TextField;
            break;
          case 'checkbox':
            component = Checkbox;
            break;
          case 'select':
            component = Select;
            break;
          default:
            break;
        }
        return {
          ...f,
          component: (
            <Field name={f.name} component={component} props={{ ...f }} />
          ),
        };
      });
      return { ...props, fields };
    }),
    withHandlers({
      addField: ({ fields, setFields }) => (e, fieldProps) =>
        setFields([...fields, fieldProps]),
      removeField: ({ fields, setFields }) => (e, name) =>
        setFields(fields.filter(f => f.name === name)),
      updateField: ({ fields, setFields }) => (e, fieldProps) => {
        const index = findIndex(fields, f => f.name === fieldProps.name);
        if (index > -1) {
          fields[index] = { ...field, ...fieldProps }; // eslint-disable-line
        }
        setFields(fields);
      },
      submit: () => e => {
        e.preventDefault();
      },
      change: () => e => {
        e.preventDefault();
      },
      toggleAdding: ({ setAdding }) => (e, val) => {
        e.preventDefault();
        setAdding(!val);
      },
    }),
  );

const EditableForm = ({ classes, fields, adding, toggleAdding }) => (
  <div className={classes.root}>
    <div>
      <Button
        variant="extendedFab"
        aria-label="Delete"
        className={classes.button}
        onClick={e => toggleAdding(e, adding)}
      >
        <AddIcon />
        Добавить поле
      </Button>
    </div>
    <Paper className={classes.container}>
      <div>
        {adding && (
          <div>
            <Form noValidate autoComplete="off">
              <Field
                name="type"
                component={Select}
                label="Тип"
                items={[
                  { value: 'text', text: 'Текст' },
                  { value: 'checkbox', text: 'Чекбокс' },
                  { value: 'select', text: 'Выбор' },
                  { value: 'multiselect', text: 'Множественный выбор' },
                ]}
                // props={{
                //   name: 'type',
                //   label: 'Тип',
                //   items: [
                //     { value: 'text', text: 'Текст' },
                //     { value: 'checkbox', text: 'Чекбокс' },
                //     { value: 'select', text: 'Выбор' },
                //     { value: 'multiselect', text: 'Множественный выбор' },
                //   ],
                // }}
              />
              <Field
                name="text"
                component={TextField}
                props={{ label: 'Название' }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Добавить
              </Button>
            </Form>
          </div>
        )}
        <Form noValidate autoComplete="off">
          {fields.map(field => (
            <div>
              <ReorderIcon />
              {field.component}
            </div>
          ))}
        </Form>
      </div>
    </Paper>
  </div>
);

EditableForm.propTypes = {
  fields: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  adding: PropTypes.bool.isRequired,
  toggleAdding: PropTypes.func.isRequired,
};

export const create = formName => enhance(formName)(EditableForm);
