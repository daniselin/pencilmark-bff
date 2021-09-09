import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import store from './config/store'
import router from './config/router';


render((
    <Provider store={store}>
        {router}
    </Provider>
), document.getElementById('root'));
