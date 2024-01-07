import React, { lazy,Suspense } from 'react';
import  ReactDOM from 'react-dom/client';
import Header from './components/Header.js';
import Body from './components/Body.js';
import About from './components/About.js';
import Error from './components/Error.js';
import Contact from './components/Contact.js';
import Foot from './components/Foot.js';
import { createBrowserRouter , RouterProvider,Outlet} from 'react-router-dom';
import Shimmer from './components/Shimmer.js';

import './index.css';
const InstaMart = lazy(() => import('./components/InstaMart.js'));

//upon on demand  laoding->suspend loading

//chunking
//dynamic bundling
//code spliiting
//lazy loading
//on deamd loading


const AppLayout=()=>{
    return(
        <div>
           <Header/> 
           <Outlet/>
           <Foot/>
        </div>
        
    )

}

const appRouter=createBrowserRouter([
    { 
      path: "/",
      element:<AppLayout/>,
      errorElement:<Error/>,
      children: [
         {
            path: "/",
            element:<Body/>,
         },
         {
            path: "/about",
            element:<About/>,
         },
         {
            path: "/contact",
            element:<Contact/>,
         },
         {
            path: "/instamart",
            element: <Suspense fallback={<Shimmer></Shimmer>}>
                 <InstaMart/>
                </Suspense> ,
         },

      ],
  },
  {
      path:"/about",
      element:<About/>,
  }
  ])
export default AppLayout;
const root= ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);

