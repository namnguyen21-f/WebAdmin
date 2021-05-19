import React,{useState,useEffect} from 'react';
import { jsx, Image, Box, Container,Heading,Text,Button } from 'theme-ui';

import {database,firebase} from "../../../firebaseConfig"

function changeTime(unixTimestamp){
    var date = new Date(unixTimestamp);
    return ""+date.getDate()+
    "/"+(date.getMonth()+1)+
    "/"+date.getFullYear()+
    " "+date.getHours()+
    ":"+date.getMinutes()+
    ":"+date.getSeconds();
}

const Dashboardpage = () => {
    const [data,setData] = useState(null);
    const [onClickIndex,setonClickIndex] = useState(-1);
    async function getData() {
        var query = firebase.database().ref('Users');
        await query.orderByChild("Timestamp").once('value', function (snapshot){
            var arr = [];
            var countPrice = 0;
            var countPriceMonth = [0,0,0,0,0];
            if (snapshot){
                snapshot.forEach(function (childSnapshot,index) {
                    var childData = childSnapshot.val();                   
                    countPrice += childData.Price;
                    
                    arr.push(childData);
                })
                
                setData(arr);
            };
        })
    }

    function handleBlockProduct(e,ID,status,index) {
        if (status == true){
            firebase.database().ref('Users/' + ID).update({"Enable" : false}).then(() => {
                getData();
            });
        }else{
            firebase.database().ref('Users/' + ID).update({"Enable" : true}).then(() => {
                getData();
            });
        }
        
    }

    useEffect(() => {
        getData();
    },[])

    return (
        <Container sx={styles.containter}>
            <Box sx={styles.wrapper} style={{marginBottom: "1rem"}}>
                <Heading sx={styles.wrapper.title}>
                    User Management
                </Heading>
                <Text sx={styles.wrapper.subTitle}>
                    User / Manage
                </Text>
            </Box>
            <Box sx={styles.mainSection}>
                <Box sx={styles.table}>
                    <Box as="div" style={{width:"100%"}}>
                        <Box sx={styles.table.row} style={{color: "#333 !important"}} as="ul">
                            <li>Status</li>
                            <li>Name</li>
                            <li>Address</li>
                            <li>Rating</li>
                            <li>Phone</li>
                        </Box>
                    </Box>
                    {data && data.map((ele,index) => {
                        return (
                            <Box style={{width:"100%"}} sx={!(ele.status && ele.username && ele.phone) && styles.red}
                                    onClick={() => {setonClickIndex(index)}}>
                                <Box sx={styles.table.row}  as="ul">
                                    <li>{ele.status? ele.status: ""}</li>
                                    <li>{ele.username ? ele.username : ""}</li>
                                    <li>{ele.address ? ele.address : ""}</li>
                                    <li>{ele.Ratings ? Object.entries(ele.Ratings).length : "0"}</li>
                                    <li>{ele.phone ? ele.phone : ""}</li>
                                </Box>
                                {onClickIndex == index && <Box key={ele.Name} as="div" sx={styles.table.specific}> 
                                    <Box sx={styles.table.specific.image} style={{width: "20%"}}>
                                        <Box>
                                            <Image src={ele.imageURL} alt={ele.Name} sx={styles.img}></Image>
                                        </Box>
                                        <Heading sx={styles.wrapper.title} style={{textAlign: "center"}}>
                                            {ele.username}
                                        </Heading>
                                    </Box>
                                    <Box sx={styles.specColumn} style={{width: "50%",padding: "1rem"}}>
                                        <Text as="p">
                                            Description: <span>{ele.id}</span>
                                        </Text>
                                        <Text as="p">
                                            Address: <span>{ele.address}</span>
                                        </Text> 
                                        <Box sx={styles.not}>
                                            <Text as="p">
                                                Phone: <span>{ele.phone}</span>
                                            </Text> 
                                            <Text as="p">
                                                Type: <span>{ele.type == 1 ? "Admin" : "Customer"}</span>
                                            </Text> 
                                            <Text as="p">
                                                Status: <span>{ele.status}</span>
                                            </Text> 
                                        </Box>
                                    </Box>
                                    <Box  sx={styles.table.specific.handle} style={{width: "30%"}}>
                                        <Button id="specific" style={{marginBottom: "1rem"}}
                                            sx={styles.wrapper.btn} onClick={(e) => {handleBlockProduct(e,ele.id,ele.Enable)}}>
                                            {ele.Enable ? "Block User" : "UnBlock User"}
                                        </Button> 
                                        <Button sx={styles.wrapper.btn}>
                                            Watch Detail
                                        </Button> 
                                    </Box>
                                </Box>}
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </Container>
    )
}

const styles = {
    containter: {
        padding: "2.5rem 1.5rem 1rem 1.5rem",
        height: "calc(100vh - 60px)",
        overflowY: "scroll",
        overflowX: "hidden",
    },
    mainSection:{
        padding: "1rem",
        background: "#fff",
    },
    not: {
        display: "flex",
        flexWrap: "wrap",
        "& p": {
            flexShrink: 0,
            flexBasis: "50%",
            textAlign: "left",
        }
    },
    red: {
        backgroundColor: "rgba(255,0,0,.6) !important",
        "& ul li": {
            color: "#fff"
        }
    },
    table: {
        row: {
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            flexWrap: "no-wrap",
            listStyle: "none",
            textAlign: "left",
            fontWeight: "400",
            color: "#7c8798",
            "& li" :{
                border: ".5px solid #e8eef3",
                padding: ".75rem",
            },
            "& li:nth-of-type(1)":{
                flexShrink: 0,
                flexBasis: "10%",
            },
            "& li:nth-of-type(2)":{
                flexShrink: 0,
                flexBasis: "25%",
            },
            "& li:nth-of-type(3)":{
                flexShrink: 0,
                flexBasis: "29%",
            },
            "& li:nth-of-type(4)":{
                flexShrink: 0,
                flexBasis: "12%",
            },
            "& li:nth-of-type(5)":{
                flexShrink: 0,
                flexBasis: "24%",
            },
        },
        specific:{
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            color: "#fff",
            handle:{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& button":{
                    color: "#fff",
                    background: "blue",
                    width: "80%",
                    padding: "0.5rem 1rem"
                }
            }
        }
    },
    specColumn: {
        display: "flex",
        flexDirection: "column",
        "& p":{
            fontSize: "0.95rem",
        }
    },
    img: {
        mx: ['auto', null, 'auto'],
        ml: ['auto', null, 'auto'],
        mb: "8px",
        width: ['120px', null, null, '150px', '170px', '200px'],
        height: "auto",
        display: "block",
      },
    wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    title: {
        fontSize: 3,
        color: 'heading_secondary',
        lineHeight: 1.5,
        fontWeight: 700,
        mb: ["6px", null, "6px"],
    },
    subTitle: {
        fontSize: 1,
        color: "#8392a5",
        fontWeight: 400,
        lineHeight: '1.5',
        mb: ["6px", null, "6px"],
    },
    btn: {
        color: "#fff",
        background: "blue",
        padding: "0.5rem 1rem",
        cursor: "pointer",
    }
    },


}

export default Dashboardpage;