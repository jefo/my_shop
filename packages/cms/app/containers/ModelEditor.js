import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, withHandlers, withState, mapProps } from 'recompose';
import { get } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import EditableForm from 'components/EditableForm';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Zoom from '@material-ui/core/Zoom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import Form from 'components/Form';
import { Actions } from './models';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit,
    color: theme.palette.text.secondary,
  },
});

const mapStateToProps = state => {
  const modelName = get(state, 'route.location.query.name', 'product'); // todo: remove fixture "product"
  const model = get(state, ['models', modelName], {
    id: 1,
    name: 'Изделие 1',
  });
  const props = get(
    state,
    ['models', modelName, 'props'],
    [{ id: 1, name: 'Наименование' }],
  );
  const forms = get(state, 'forms', [{ id: 1, name: 'Товар', fields: props }]);
  return { forms, modelProps: props, model };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Actions,
      addForm: Actions.addModel,
    },
    dispatch,
  );

const enhance = compose(
  withStyles(styles),
  // mapProps(p => ({
  //   ...p,
  //   transitionDuration: {
  //     enter: p.theme.transitions.duration.enteringScreen,
  //     exit: p.theme.transitions.duration.leavingScreen,
  //   },
  // })),
  withState('adding', 'setAdding', false),
  withHandlers({
    toggleAdding: ({ setAdding }) => (e, val) => setAdding(!val),
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

const AddFormForm = ({ onSubmit }) => (
  <Form onSubmit={onSubmit}>
    <TextField name="name" label="Название" />
    <Button type="submit" variant="contained" color="primary">
      Сохранить
    </Button>
  </Form>
);

AddFormForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const ModelEditor = ({
  classes,
  modelProps,
  addProp,
  toggleAdding,
  addForm,
  forms,
  adding,
  transitionDuration,
}) => (
  <div className={classes.root}>
    {forms.map(f => (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{f.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <EditableForm name={f.id} fields={f.fields} />
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small">Отмена</Button>
          <Button size="small" color="primary">
            Сохранить
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    ))}
    <Zoom unmountOnExit>
      <Button
        variant="fab"
        size="small"
        color="primary"
        aria-label="Add"
        className={classes.button}
      >
        <AddIcon />
      </Button>
    </Zoom>
  </div>
);

ModelEditor.propTypes = {
  classes: PropTypes.object.isRequired,
  modelProps: PropTypes.array.isRequired,
  addProp: PropTypes.func.isRequired,
  removeProp: PropTypes.func.isRequired,
  updateProp: PropTypes.func.isRequired,
  // onFormSelect: PropTypes.func.isRequired,
  toggleAdding: PropTypes.func.isRequired,
  addForm: PropTypes.func.isRequired,
  forms: PropTypes.array.isRequired,
  adding: PropTypes.bool,
};

ModelEditor.defaultProps = {
  adding: false,
};

export default enhance(ModelEditor);
