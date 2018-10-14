/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { LOCATION_CHANGE } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reduxForm } from 'redux-form';
import { merge } from 'lodash';

import languageProviderReducer from 'containers/LanguageProvider/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */
//
// Initial routing state
const routeInitialState = {
  location: {},
};

/**
 * Merge route into the global application state
 */
export function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return merge(state, {
        location: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */

export default injectedReducers =>
  combineReducers({
    form: reduxForm,
    route: routeReducer,
    language: languageProviderReducer,
    ...injectedReducers,
  });
