import { createActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { merge, get, omit } from 'lodash';

export const Actions = createActions({
  ADD_PROP: prop => ({ prop }),
  REMOVE_PROP: prop => ({ prop }),
  UPDATE_PROP: propName => ({ propName }),
  ADD_MODEL: name => ({ name }),
  ADD_MODEL_SUCCESS: model => ({ model }),
  ADD_MODEL_FAIL: error => ({ error }),
});

const { addProp, removeProp, updateProp, addModel } = Actions;

export const entitiesState = {};

const propsReducer = entityName => (state = entitiesState, action) => {
  if (action.meta.name !== entityName) {
    return state;
  }
  const { payload, type } = action;
  const addOrUpdate = () => ({
    ...state,
    [payload.prop.name]: merge(
      {},
      get(state, payload.prop.name, {}),
      payload.prop,
    ),
  });
  let newState = state;
  switch (type) {
    case [addProp]:
    case [updateProp]:
      newState = addOrUpdate();
      break;
    case [removeProp]:
      newState = omit(state, payload.propName);
      break;
    case [addModel]:
      newState = { ...state, [payload.model.id]: payload.model };
      break;
    default:
      break;
  }
  return newState;
};

export default combineReducers({
  product: propsReducer('product'),
});
