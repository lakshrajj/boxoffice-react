import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        This is Home PAGE
      </Route>

      <Route exact path="/starred">
        This is Starred
      </Route>

      <Route>Eorror 404 - Page not Fount</Route>
    </Switch>
  );
}
export default App;
