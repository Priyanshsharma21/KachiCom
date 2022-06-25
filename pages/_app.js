import React from 'react';
import '../styles/globals.css';
import {Layout} from '../components';
import '../styles/globals.css';
import {StateContext} from '../context/StateContext';
import { Toaster } from 'react-hot-toast';



function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
      <Toaster />
       <Component {...pageProps} />
        {/* we get access to it using children props  */}
      </Layout>
    </StateContext>
    
  )
}

// wrap stateContext so we can use all the states it have in all the programe 

export default MyApp
