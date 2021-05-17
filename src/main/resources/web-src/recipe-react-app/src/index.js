import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import recipesReducer from './store/reducers/recipesReducer';
import recipeReducer from './store/reducers/recipeReducer';
import recipeFormReducer from './store/reducers/recipeFormReducer';
import ingredientFormReducer from './store/reducers/ingredientFormReducer';
import commentFormReducer from './store/reducers/commentFormReducer';
import deleteRecipeReducer from './store/reducers/deleteRecipeReducer';
import {
  watchFetchAllRecipes,
  watchFetchSingleRecipe,
  watchSubmitRecipe,
  watchSubmitComment,
  watchDeleteRecipe
} from './store/sagas/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  allRecipes: recipesReducer,
  singleRecipe: recipeReducer,
  recipeForm: recipeFormReducer,
  ingredientForm: ingredientFormReducer,
  commentForm: commentFormReducer,
  deleteRecipe: deleteRecipeReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(watchFetchAllRecipes);
sagaMiddleware.run(watchFetchSingleRecipe);
sagaMiddleware.run(watchSubmitRecipe);
sagaMiddleware.run(watchSubmitComment);
sagaMiddleware.run(watchDeleteRecipe);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    {app}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
