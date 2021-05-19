import React, { Suspense } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Recipes from './components/Recipes/Recipes';
import Recipe from './components/Recipe/Recipe';
import RecipeForm from './components/RecipeForm/RecipeForm';
import ImageForm from './components/ImageForm/ImageForm';

function App() {
  const routes = (
    <Switch>
      <Route exact path="/recipe/new" component={RecipeForm} />
      <Route exact path="/recipe/:id/update" component={RecipeForm} />
      <Route exact path="/recipe/:id/image" component={ImageForm} />
      <Route exact path="/recipe/:id" component={Recipe} />
      <Route exact path="/recipe" component={Recipes} />
      <Route exact path="/" component={Home} />
    </Switch>
  );

  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;