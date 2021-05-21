/** @jsx jsx */
import { jsx, Container, Flex, Button, Box } from 'theme-ui';
import {
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
  Slider,
} from 'theme-ui'
import { keyframes } from '@emotion/core';
import GoogleLogin from 'react-google-login';
import Link from 'next/link'
import Logo from 'components/logo';
import LogoDark from 'assets/logo.svg';
import MobileDrawer from './mobile-drawer';
import menuItems from './header.data';

import firebase from "firebase/app";
import "firebase/auth";
import {config} from "../../../config"

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}else {
  firebase.app(); // if already initialized, use that one
}
export default function Header({ className }) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLogin, setIsLogin] = React.useState(true);
  const [account , setAccount] = React.useState(null);
  const responseGoogle = (response) => {
    var res = response.profileObj;
    localStorage.setItem('Authorization','Bearer ' + res);
    localStorage.setItem('Name','Bearer ' + res.name);
    setAccount(res);
    // setIsLogin(false);
    window.location.href = "/dashboard";
  }

  const handleSubmit = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      user.name = user.displayName;
      setAccount(user);
      // setIsLogin(false);
      window.location.href = "/dashboard";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }
  return (
      <header sx={styles.header}>
        <Container sx={styles.container}>
          {/* <Logo src={LogoDark} />
          <Flex as="nav" sx={styles.nav}>
            {menuItems.map((ele,index) => {
              return (
                <Link 
                  href={ele.path}
                  spy={true}
                  offset={0}
                  duration={500}
                  offset={-70}
                  key={index}>
                  {ele.label}
                </Link>
              )
            })}
          </Flex>
          <Button className="donate__btn" onClick={() => {isLogin == false && setIsLogin(true)}}>
            {account ? account.name : "Login"}
          </Button> */}
          {isLogin && <Box sx={styles.loginSection}>
            <Box sx={styles.loginSection.container}>
              <div>
                  <Box as="form" onSubmit={(e) => e.preventDefault()}>
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" type="email" id="email" mb={3} value={email} required onChange={e => setEmail(e.target.value)}/>
                    <Label htmlFor="password">Password</Label>
                    <Input name="password" type="password" id="password" mb={3} value={password} required onChange={e => setPassword(e.target.value)}/>
                    <Box>
                      <Label mb={3}>
                        <Checkbox />
                        Remember me
                      </Label>
                    </Box>
                  </Box>
                  <Button style={{margin :"auto",display: "block",marginBottom : "1rem"}} onClick={() => handleSubmit()}>SIGN IN</Button>
                  <Box style={{margin :"auto",display: "flex",justifyContent: "center"}}>
                    <GoogleLogin
                      clientId="796371651239-pedmdnii1j6fe1moecpghn9lh7c23kqb.apps.googleusercontent.com"
                      buttonText="Login with Google"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle} 
                      ></GoogleLogin>
                  </Box>
                  <Button style={{margin :"auto",display: "block",marginTop : "1rem",background: "#333"}} onClick={() => setIsLogin(false)}>BACK</Button>
                </div>

              </Box>
          </Box>
          }
          <MobileDrawer>
            
          </MobileDrawer>
        </Container>
      </header>
  );
}

const positionAnim = keyframes`
  from {
    position: fixed;
    opacity: 1;
  }

  to {
    position: absolute;
    opacity: 1;
    transition: all 0.4s ease;
  }
`;

const styles = {
  header: {
    color: 'text',
    fontWeight: 'body',
    py: 4,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    
    backgroundColor: 'transparent',
    transition: 'all 0.4s ease',
    animation: `${positionAnim} 0.4s ease`,
    '.donate__btn': {
      flexShrink: 0,
      mr: [15, 20, null, null, 0],
      ml: ['auto', null, null, null, 0],
    },
    '&.sticky': {
      position: 'fixed',
      backgroundColor: 'background',
      color: '#000000',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.06)',
      py: 3,
      'nev > a': {
        color: 'text',
      },
    },
  },
  loginSection: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    position: "absolute",
    top:0,
    right: 0,
    left: 0,
    "&:before":{
      width: "100vw",
      content: "''",
      right: 0,
      top:0,
      left: 0,
      height: "100vh",
      zIndex: 1,
      position: "absolute",
      backgroundColor: "rgba(0,0,0,.5)",
    },
    container: {
      backgroundColor: "#fff",
      padding: "2rem",
      zIndex: 99,
      "& form" :{

      }
    }
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nav: {
    mx: 'auto',
    display: 'none',
    '@media screen and (min-width: 1024px)': {
      display: 'block',
    },
    a: {
      fontSize: 2,
      fontWeight: 'body',
      px: 5,
      cursor: 'pointer',
      lineHeight: '1.2',
      transition: 'all 0.15s',
      '&:hover': {
        color: 'primary',
      },
      '&.active': {
        color: 'primary',
      },
    },
  },
};
