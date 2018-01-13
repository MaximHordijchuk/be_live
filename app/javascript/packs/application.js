let componentRequireContext = require.context('components', true);
let storeRequireContext = require.context('store', true);
let ReactRailsUJS = require('react_ujs');
ReactRailsUJS.useContext(componentRequireContext, storeRequireContext);
