import React from 'react';
import NavigationBar from '../components/navigationBar/navigationBar'
import Userpage from '../components/user/Userpage'
import { jsx, Image, Box, Container, ThemeProvider } from 'theme-ui';
import Layout from 'components/layout';
//import Usermanage from '../components/usermanage/Usermanage'


class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <ThemeProvider>
                <Layout isNav="false">
                    <Container sx={styles.container}>
                        <Box sx={styles.leftSide}>
                            <NavigationBar logo="" location="VietNam"></NavigationBar>
                        </Box>
                        <Box sx={styles.rightSide}>
                            <Box sx={styles.rightSide.featureBar}>
                                
                            </Box>
                            <Userpage></Userpage>
                        </Box>
                    </Container>
                </Layout> 
            </ThemeProvider>
        )
    }
}

const styles = {
    container: {
        width: "100%",
        display: 'flex',
    },
    leftSide: {
        width: "18%",
        background: "#fff",
        minHeight : "100%",
        boxShadow: "0 3px 9px 0 #333",
        height: "100vh",
    },
    rightSide: {
        width: "82%",
        background: "#f9fbfd",
        minHeight: "100%",
        featureBar : {
            width: "100%",
            height: "60px",
            padding: ".5rem 1rem",
            borderBottom: "1px solid #edf2f9",
        }
    },
}



export default Homepage;