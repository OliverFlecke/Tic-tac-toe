import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/app/App';

// Make element available to the dispose function
let element: Element;

/**
 * Called by some other non-react component to render this react component
 * @param options Options to configure the component with
 */
export function init() {
    element = document.getElementById('app-render-target');

    if (!element) {
        // TODO: how should this be handled?
        throw Error("App render target missing; ensure an element with the ID 'app-render-target' is present in the DOM.");
    }

    //Run the init check as to whether to call L1 API
    ReactDOM.render(
        <App />,
        element
    );
}

/**
 * Must be called by the component that called init to ensure our component is unmounted
 */
export function dispose(): void {
    ReactDOM.unmountComponentAtNode(element);
}
