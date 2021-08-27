import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './store/store'

import { SnackbarProvider } from 'notistack'
import Slide from '@material-ui/core/Slide'

import { App } from './App'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        TransitionComponent={Slide}
        preventDuplicate
        maxSnack={1}
      >
        <App />
      </SnackbarProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);