import React, { createContext, useContext, useReducer } from 'react';
import {
  StateProviderPropTypes,
  StateProviderDefaultProps,
} from '../types';

export const StateContext = createContext();

export const StateProvider = ({
  reducer,
  initialState,
  children,
}) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

StateProvider.propTypes = StateProviderPropTypes;
StateProvider.defaultProps = StateProviderDefaultProps;

export const useStateValue = () => useContext(StateContext);
