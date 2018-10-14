import { createActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { merge, get, omit } from 'lodash';

const { addProp, removeProp, updateProp } = createActions({
  ADD_PROP: prop => ({ prop }),
  REMOVE_PROP: prop => ({ prop }),
  UPDATE_PROP: propName => ({ propName }),
});

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
    default:
      break;
  }
  return newState;
};

export default combineReducers({
  product: propsReducer('product'),
});
