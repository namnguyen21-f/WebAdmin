import React,{useState,useEffect} from 'react';
import { jsx, Image, Box, Container,Heading,Text } from 'theme-ui';

import {database,firebase} from "../../../firebaseConfig"
import { Doughnut, Line } from 'react-chartjs-2';

const Dashboardpage = () => {
    const [product, setProducts] = useState([]);
    const [price, setPrice] = useState(0);
    const [report, setReport] = useState(0);
    const [user, seUser] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [dataChart, setDataChart ] = useState(null);
    const [dataChart2, setDataChart2 ] = useState(null);
    function drawChart(dataArr){
        
        const chartOptions = {
            plugins:{
                legend:{
                    display: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }

        const chartData = {
            labels: ['January', 'Febuary' ,'March'  , 'April' , 'May'],
            datasets: [{
                data: dataArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',    
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
                barThickness: 15,
            }]
        }
        return (
            <Line data={chartData} options={chartOptions}>

            </Line>
        )
    }

    function drawDoghnutChart(dataArr){
        const chartOptions = {
            plugins:{
                legend:{
                    display: false,
                }
            },
           
        }

        const chartData = {
            labels: ["OnSale","Saled"],
            datasets: [{
                data: dataArr,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                  ],
                hoverOffset: 4,
            }]
        }
        return (
            <Doughnut data={chartData} options={chartOptions}>

            </Doughnut>
        )
    }

    async function getData() {
        var query = firebase.database().ref('Products');
        await query.orderByChild("Timestamp").once('value', function (snapshot){
            var arr = [];
            var countPrice = 0;
            var countPriceMonth = [0,0,0,0,0];
            if (snapshot){
                snapshot.forEach(function (childSnapshot,index) {
                    var childData = childSnapshot.val();                   
                    countPrice += childData.Price;
                    arr.push(childData);
                    if ((Date.now() - childData.Timestamp) < 1000 * 60 * 60 * 24 * 30){
                        countPriceMonth[2] += childData.Price;
                    }else if ((Date.now() - childData.Timestamp) < 1000 * 60 * 60 * 24 * 60){
                        countPriceMonth[3] += childData.Price;
                    }else if ((Date.now() - childData.Timestamp) < 1000 * 60 * 60 * 24 * 90){
                        countPriceMonth[4] += childData.Price;
                    }
                });
                const arrSale = arr.filter(ele => ele.Status == 1);
                const arrSaled = arr.filter(ele => ele.Status == 0);
                setProducts(arr);
                setPrice(countPrice.toLocaleString('en-US',{
                    style: 'currency',
                    currency: "VND",
                }));
                setDataChart(countPriceMonth);
                setDataChart2([arrSale.length,arrSaled.length,0]);
                //([arrSale.length,arrSaled.length,0]);
            }
        })

        var query2 = firebase.database().ref('Report');
        await query2.once('value', function (snapshot){
            var arr = [];
            var countPrice = 0;
            if (snapshot){
                let i = 0;
                snapshot.forEach(function (childSnapshot,index) {
                    i = i+1;
                });
                setReport(i);
            }
        })
        var query3 = firebase.database().ref('Users');
        await query3.once('value', function (snapshot){
            var arr = [];
            var countPrice = 0;
            if (snapshot){
                let i = 0;
                snapshot.forEach(function (childSnapshot,index) {
                    i = i+1;
                });
                seUser(i);
            }
        })
        setIsLoading(false);
    }

    function changeTime(unixTimestamp){
        var date = new Date(unixTimestamp);
        return ""+date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()+
        ":"+date.getSeconds();
    }
    useEffect(() => {
        getData();
    },[])
    return (
        <Container sx={styles.containter}>
            <Box sx={styles.wrapper} style={{marginBottom: "1rem"}}>
                <Heading sx={styles.wrapper.title}>
                    Good Morning, ALEXADRAVANTO
                </Heading>
                <Text sx={styles.wrapper.subTitle}>
                    Dashboard
                </Text>
            </Box>
            <Box sx={styles.section1}>
                <Box sx={styles.section1.section1_item}>
                    <h2>{product ? product.length : "N/A"}</h2>
                    <p>New Products / Months</p>
                </Box>
                <Box sx={styles.section1.section1_item}>
                    <h2>{price ? price : 0}</h2>
                    <p>Total money</p>
                </Box>
                <Box sx={styles.section1.section1_item}>
                    <h2>{report}</h2>
                    <p>Total Report</p>
                </Box>
                <Box sx={styles.section1.section1_item}>
                    <h2>{user}</h2>
                    <p>Total user</p>
                </Box>
            </Box>
            <Box sx={styles.chart}>
                <Box sx={styles.chart.chart_1}>
                    <h3>Total Income</h3>
                    {!dataChart ? "" : 
                        drawChart(dataChart)}
                </Box>  
                <Box sx={styles.chart.chart_2}>
                    <h3>Total Transaction</h3>
                    {!dataChart2 ? "" : 
                        drawDoghnutChart(dataChart2)}
                    <div>
                        <ul>
                            <li><i></i> Already Saled</li>
                            <li>{product.filter(ele => ele.Status == 0).length}</li>
                        </ul>
                        <ul>
                            <li><i></i> On Sales</li>
                            <li>{product.filter(ele => ele.Status == 1).length}</li>
                        </ul>
                        <ul>
                            <li><i></i> Not Sales</li>
                            <li>0</li>
                        </ul>
                    </div>
                </Box> 
            </Box>
            <div className="Dashboard__table">
                <h2>Recent Products</h2>
                <div className="Dashboard__table__rcproduct">
                    {product.length == 0 ? "" :
                        <Box as="table" sx={styles.table}>
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">ProductID</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.map((ele,index) => {
                                    return (
                                        <tr key={index}>
                                            <th>{ele.Name}</th>
                                            <th>{ele.Price.toLocaleString('en-US',{
                                                style: 'currency',
                                                currency: "VND",
                                            })}</th>
                                            <th>{ele.ProID}</th>
                                            <th>{ele.Status == 1 ? "Onsale" : "Saled"}</th>
                                            <th>{changeTime(ele.Timestamp)}</th>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Box>}
                </div>
            </div>

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
    section1: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "3.5rem",
        flexWrap: "wrap",
        section1_item :{
            padding: "1rem 1.5rem",
            flexShrink: 0,
            width: ['100%', '100%', '100%', '25%', '25%', '25%'],
            backgroundColor: "#fff",
            backgroundClip: "border-box",
            boxShadow: "0 0 12px 2px #edf2f9",
            height: "auto",
            "& p" :{
                color: "#9eabc0!important",
                fontWeight: "600",
                fontFamily: "sans-serif",
            },
            "& h2" : {
                fontSize: "2rem",
                color: "#333",
                fontWeight: 600,
            }
        }
    },

    chart:{
        borderRadius: "3px",
        display: "flex",
        marginBottom: "2rem",
        chart_1 : {
            backgroundColor: "#fff",
            boxShadow: "0 0 12px 2px #f2f2f2",
            "& h3": {
                fontFamily: "Rubik,sans-serif",
                fontWeight: "600",
                marginBottom: ".875rem",
            },
            padding: "1rem",
            width: "60%",
            height: "auto",   
        },
        chart_2:{
            padding: "1rem",
            backgroundColor: "#fff",
            boxShadow: "0 0 12px 2px #f2f2f2",
            width: "35%",
            marginLeft: "5%",
            height: "auto",
            "& h3":{
                fontFamily: "Rubik,sans-serif",
                fontWeight: "600",
                marginBottom: ".875rem",
            },
            "& canvas": {
                width: "70%",
                margin: "auto",
                height: "auto",
            },
            "& div": {
                width: "80%",
                marginLeft: "10%",
                marginTop: "2rem",
                "& ul":{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    listStyle: "none",
                    "& li i":{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        marginRight: "3px",
                        backgroundColor: "#333 !important",
                        display: "inline-block",
                    },
                    "& li:nth-of-type(odd)":{
                        color: "#9eabc0",
                        textTransform: "capitalize",
                        fontWeight: "400",
                    },
                    "& li:nth-of-type(even)":{
                        color: "#1c2d41",
                        fontWeight: "600",
                    }
                }
            }
        }
    },

    table:{
        borderCollapse: "collapse",
        margin: "25px 0",
        fontSize: "0.9rem",
        fontFamily: "san-serif",
        minWidth: "400px",
   
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
        "& thead tr" :{
            backgroundColor: "#009879",
            color: "#ffffff",
            textAlign: "left",
        },

        "& th,& td" : {
            padding: "12px 15px",
        },
        "& tbody tr" : {
            borderBottom: "1px solid #dddddd",
        },
        "& tbody tr:nth-of-type(even)" : {
            backgroundColor: "#f3f3f3",
        },
        "& tbody tr:last-of-type" :{
            borderBottom: "2px solid #009879",
        },
    },

    card: {
      display: 'flex',
      alignItems: ['center', 'flex-start'],
      flexDirection: 'column',
      mb: -1,
      textAlign: ['center', null, 'left'],
      px: [4, null, 0],
    },
    img: {
      mx: ['auto', null, 0],
      ml: ['auto', null, '-13px'],
      mb: -2,
      width: ['80px', null, null, '90px', null, 'auto'],
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
    },
  };

  
export default Dashboardpage;

