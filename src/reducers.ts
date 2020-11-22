import { combineReducers, ReducersMapObject } from "redux";
import { connectRouter } from "connected-react-router";

import paintersReducer from '@components/Pages/Painters/reducer';

export const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),

    painters: paintersReducer,
  } as ReducersMapObject<any, any>);

export default createRootReducer;