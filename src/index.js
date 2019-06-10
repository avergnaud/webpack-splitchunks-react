import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, NavLink as Link, Route } from 'react-router-dom';
import loadable from 'react-loadable';

import './styles.scss';

/* 
webpack import function !
import async.js
needs babel plugin syntax-dynamic-import
*/
import( './async.js' ).then( ( data ) => {
    console.log( data );
} );

// loader
const LoadingComponent = () => <h3>please wait...</h3>;

// home component
const AsyncHomeComponent = loadable( {
    loader: () => import( './home.component' ),
    loading: LoadingComponent
} );

// about component
const AsyncRouteBComponent = loadable( {
    loader: () => import( './routeb.component' ),
    loading: LoadingComponent
} );

// route c component
const RouteCComponentPromise = () => {
    return import('./routec.component');
}
const AsyncRouteCComponent = loadable( {
    loader: RouteCComponentPromise,
    loading: LoadingComponent
} );

// create sample App component
class App extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        return(
            <BrowserRouter>
                <div>
                    <div className="menu">
                        <Link exact to="/" activeClassName="active">Home</Link>
                        <Link to="/routeb" activeClassName="active">Route B</Link>
                        <Link to="/routec" activeClassName="active">Route C</Link>
                    </div>
                    
                    <Switch>
                        <Route exact path="/" component={ AsyncHomeComponent } />
                        <Route path="/routeb" component={ AsyncRouteBComponent } />
                        <Route path="/routec" component={ AsyncRouteCComponent } />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

// render inside `app-root` element
ReactDOM.render( <App />, document.getElementById( 'app-root' ) );