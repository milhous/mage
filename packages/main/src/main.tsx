import { StrictMode, Suspense } from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import configureStore from '@app/redux/store';
import { routes } from '@app/routes/app.routes';
import Loading from './pages/loading';

ReactDOM.render(
    <Provider store={configureStore()}>
        <StrictMode>
            <Suspense fallback={<Loading />}>
                <BrowserRouter>
                    <Switch>{renderRoutes(routes)}</Switch>
                </BrowserRouter>
            </Suspense>
        </StrictMode>
    </Provider>,
    document.getElementById('root'),
);
