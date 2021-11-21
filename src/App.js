import { Route } from 'react-router';
import { Navigation } from './components/Navigation/Navigation';
import { Homeview } from './views/HomeView';
import { AuthorsView } from 'views/AuthorsView';
import { BooksView } from 'views/BooksView';

function App() {
  return (
    <div className="App">
      <Navigation />

      <Route path="/" exact>
        <Homeview />
      </Route>

      <Route path="/authors" exact>
        <AuthorsView />
      </Route>

      <Route path="/books" exact>
        <BooksView />
      </Route>
    </div>
  );
}

export default App;
