import React from 'react';

import { render } from 'react-dom';

// Import css
import css from './styles/style.styl';

// Import components
import App from './components/App';
import Single from './components/Single';
import PhotoGrid from './components/PhotoGrid';

// Import react router devs
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

import Raven from 'raven-js';
import { sentry_url } from './data/config';

// We use Sentry to log all errors that occur through the app and Raven to send them
Raven.config('https://33939d3bfe6b4ecf815b17510edadf7b@sentry.io/1269892', {
	tags: {
		git_commit: 'commit 1',
		userLevel: 'editor'
	}
}).install();

// Pass along extra info with error
/*Raven.captureException(new Error('download failed'), {
	extra: {
		email: 'jorge@hispire.com'
	}
});*/

// Log a simple message
// Raven.captureMessage('Something bad happened');

// Show feedback dialog for error
// Raven.showReportDialog();

const router = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={PhotoGrid} />
				<Route path="/view/:postId" component={Single} />
			</Route>
		</Router>
	</Provider>
);

render(router, document.getElementById('root'));
