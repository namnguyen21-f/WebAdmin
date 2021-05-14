/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';
import Sticky from 'react-stickynode';
import Header from './header/header';
import Footer from './footer/footer';

export default function Layout({ isNav,children }) {
 
  const [isSticky, setIsSticky] = useState(false);

  const handleStateChange = (status) => {
    if (status.status === Sticky.STATUS_FIXED) {
      setIsSticky(true);
    } else if (status.status === Sticky.STATUS_ORIGINAL) {
      setIsSticky(false);
    }
  };
 
  if (isNav == true){
    return (<React.Fragment>
      <Sticky innerZ={1001} top={0} onStateChange={handleStateChange}>
        <Header className={`${isSticky ? 'sticky' : 'unSticky'}`} />
      </Sticky>
      <main id="content" sx={{ variant: 'layout.main', }} >
        {children}
      </main>
      <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
            font-weight: 400;
            line-height: 1.5;       
          }
          body{
            overflow-x: hidden;
          }
          a{
            text-decoration: none;
          }
          @media only screen and (min-width: 480px){
            html{
              font-size: 12px;
            }
          }
          @media only screen and (min-width: 768px){
            html{
              font-size: 14px;
            }
          }
          @media only screen and (min-width: 1024px){
            html{
              font-size: 16px;
            }
          }
          @media only screen and (min-width: 1366px){
            html{
              font-size: 18px;
            }
          }
          body{
            font-family: 'Rubik', sans-serif;
          }
        `}</style>
      <Footer />
      
    </React.Fragment>)
  }else{
    return (
      <div className="page-wrapper">
        {children}
        <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
            font-weight: 400;
            line-height: 1.5;       
          }
          a{
            text-decoration: "none";
          }
          @media only screen and (min-width: 480px){
            html{
              font-size: 12px;
            }
          }
          @media only screen and (min-width: 768px){
            html{
              font-size: 14px;
            }
          }
          @media only screen and (min-width: 1024px){
            html{
              font-size: 16px;
            }
          }
          @media only screen and (min-width: 1366px){
            html{
              font-size: 18px;
            }
          }
          body{
            font-family: 'Rubik', sans-serif;
          }
        `}</style>
      </div>
    )
  }
  
}


// <style jsx global>{`
// body {
//   background: ${theme.colors.background};
//   color: ${theme.colors.text};
//   font-family: ${theme.fontFamily.sansSerif};
// }
// `}</style>