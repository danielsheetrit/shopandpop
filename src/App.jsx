import './assets/css/styles.scss'

import { Route, Switch } from 'react-router-dom'
import { routes } from './routes'

import { AppHeader } from './components/AppHeader'

export function App() {
  return (
    <div className="App">
      <AppHeader />
      <Switch>
        {routes.map(route =>
          <Route
            key={route.path}
            component={route.component}
            path={route.path} />)}
      </Switch>
    </div>
  );
}