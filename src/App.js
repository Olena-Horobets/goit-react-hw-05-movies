import 'App.css';
import { Route, Switch } from 'react-router';
import { lazy, Suspense } from 'react';

import { Navigation } from './components/Navigation/Navigation';

const HomePage = lazy(() =>
  import('./pages/HomePage.js' /* webpackChunkName: "home-page" */),
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
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
