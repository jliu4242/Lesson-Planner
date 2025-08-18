import React from 'react';
// @ts-ignore
import { auth } from '../../firebase/firebaseUI.js'

function loginPage() {

    return (
        <>
            <h1>Hello</h1>
            <div id='firebaseui-auth-container'></div>
        </>
    )
}

export default loginPage;