import 'App.css';
import { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router';

import { Navigation } from './components/Navigation/Navigation';
import Loader from './components/Loader';

const HomePage = lazy(() =>
  import('./pages/HomePage/HomePage.js' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import(
    './pages/MoviesPage/MoviesPage.js' /* webpackChunkName: "movies-page" */
  ),
);
const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage/MovieDetailsPage.js' /* webpackChunkName: "movie-details-page" */
  ),
);
const ActorPage = lazy(() =>
  import('./pages/ActorPage/ActorPage.js' /* webpackChunkName: "actor-page" */),
);

function App() {
  return (
    <div className="App">
      <Navigation />

      <div className="container">
        <Suspense fallback={Loader}>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/movies" exact>
              <MoviesPage />
            </Route>
            <Route path="/movies/:slug">
              <MovieDetailsPage />
            </Route>
            <Route path="/actors/:slug">
              <ActorPage />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
