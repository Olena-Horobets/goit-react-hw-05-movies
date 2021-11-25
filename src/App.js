import 'App.css';
import { Route, Switch } from 'react-router';
import { lazy, Suspense } from 'react';

import { Navigation } from './components/Navigation/Navigation';

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

function App() {
  return (
    <div className="App">
      <Navigation />

      <Suspense fallback={<h4>loading..</h4>}>
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
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
