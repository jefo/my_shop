import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose, withState, withHandlers } from 'recompose';
import ReorderIcon from '@material-ui/icons/Reorder';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Select from 'components/Select';
import Form from 'components/Form';

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

const enhance = compose(
  withStyles(styles),
  withState('adding', 'setAdding', false),
  withHandlers({
    onSubmitFieldForm: ({ addField }) => field => {
      addField(field);
    },
    toggleAdding: ({ setAdding }) => (e, val) => {
      e.preventDefault();
      setAdding(!val);
    },
  }),
);

export const Field = props => {
  let FieldComponent;
  switch (props.component) {
    case 'checkbox':
      FieldComponent = Checkbox;
      break;
    case 'select':
      FieldComponent = Select;
      break;
    default:
      FieldComponent = TextField;
      break;
  }
  return <FieldComponent {...props} />;
};

Field.propTypes = {
  component: PropTypes.string.isRequired,
};

const EditableForm = ({
  classes,
  name,
  adding,
  toggleAdding,
  fields,
  onSubmit,
  onSubmitFieldForm,
}) => (
  <div className={classes.root}>
    <div>
      <Button
        variant="contained"
        aria-label="Add"
        className={classes.button}
        onClick={e => toggleAdding(e, adding)}
      >
        <AddIcon />
        Добавить
      </Button>
    </div>
    <div>
      <Form onSubmit={onSubmitFieldForm}>
        <Select
          name="type"
          label="Тип"
          items={[
            { value: 'text', label: 'Текст' },
            { value: 'select', label: 'Выбор' },
            { value: 'checkbox', label: 'Чекбокс' },
          ]}
        />
        <TextField name="name" label="Название" />
      </Form>
      <div>
        <Button type="submit" variant="contained" color="primary">
          Сохранить
        </Button>
      </div>
    </div>
    <div>
      {adding && <div />}
      <Form name={name} onSubmit={onSubmit}>
        {fields.map(f => <Field key={f.name} {...f} />)}
      </Form>
    </div>
  </div>
);

EditableForm.Field = Field;

EditableForm.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  adding: PropTypes.bool.isRequired,
  toggleAdding: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSubmitFieldForm: PropTypes.func.isRequired,
};

export default enhance(EditableForm);
