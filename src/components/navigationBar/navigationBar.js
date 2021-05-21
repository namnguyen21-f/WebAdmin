import React, { useState } from 'react';
import {EnvironmentOutlined,SearchOutlined,FlagOutlined,
    CaretDownOutlined,ShoppingCartOutlined,HomeOutlined} from '@ant-design/icons';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { jsx, Image, Box, Container } from 'theme-ui';
const Map = [
    {icon:1,pathurl: "/dashboard",name: "Dashboard"},
    {icon:1,pathurl: "/product",name: "Product"},
    {icon:1,pathurl: "/user",name: "User"},
]

const NavigationBar = ({logo}) => {
    const router = useRouter()
    const [search,setSearch] = useState("");
    const [cur,setCur] = useState(0);
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    console.log(router.pathname);
    return (
        <Box as="div" sx={styles.navBar}>
            <Box sx={styles.navBar.logo}>
                <a href="/">
                    <Image alt="Logo" style={{width: "100px",height: "auto"}} 
                        src="https://firebasestorage.googleapis.com/v0/b/old-stock-trade.appspot.com/o/Images%2Fic_launcher_round.png?alt=media&token=a1bcb297-5353-402a-948c-6909cabc362c"></Image>
                </a>  
            </Box>
            <Box as="div" sx={styles.navBar.main}>
                {Map.map((ele,index) => {
                    return <Link key={ele.pathurl} href={ele.pathurl} onClick={() => {setCur(index)}}>
                        <Box sx={router.pathname != ele.pathurl ? styles.navBar.main.item : 
                            {...styles.navBar.main.selected,...styles.navBar.main.item}}>
                            <HomeOutlined style={{color: index == cur ? "#fff" : "#333"}}></HomeOutlined>
                            <p>{ele.name}</p>
                        </Box>
                    </Link>
                })}
            </Box>
        </Box>
    )
}
const styles = {
    navBar: {
        width: "100%",
        height: "fit-content",
        padding: "0.5rem 0",
        backgroundColor: "#131921",
        background: "#fff",
        logo: {
            width: "100%",
            padding: "1.5rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",   
        },
        main: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            flexWrap: "wrap",
            item: {
                width: "90%",
                padding: "8px 2rem 8px 2rem",
                "& *" :{
                  display: "inline-block",
                },
                "& p": {
                  marginLeft: "1rem",
                  fontSize: "1.1rem",
                },
                cursor: "pointer",
            },
            selected: {
                borderRadius: "0 1rem 1rem 0",
                borderBottom: "1xp solid #333",
                background: "linear-gradient(to right,#8971ea,#7f72ea,#7574ea,#6a75e9,#5f76e8)",
                boxShadow: "0 7px 12px 0 #8971ea",
                color: "#fff",
            }
        },
    },
}


export default NavigationBar;