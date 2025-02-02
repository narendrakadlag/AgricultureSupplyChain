// import React, { Component } from 'react';
// import { NavLink, withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
// import Header from '../../components/header/Header';
// import Button from '@material-ui/core/Button';

// class Distributor extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             clicked: false
//         }
//     }
//     handleClick() {
//         this.setState({
//             clicked: true
//         })
//         console.log("Clicked");
//     }

//     render() {
//         return (
//             <Router>
//                 <div style={{
//                     backgroundColor: "white",
//                     // backgroundImage: `url(${BackgroundImg})`,
//                     backgroundSize: "cover", backgroundRepeat: "no-repeat", height: '1000px',
//                 }}>
//                     <Header />
//                     <div className="body-container">
//                         <h3 style={{ textAlign: "center", color: "black" }}>Welcome Distributor!</h3>
//                         <Button variant="contained" color="primary" onClick={() => this.handleClick()}>View Received Medicine</Button>
//                         {/* <Button variant="contained" color="primary" onClick={()=>{this.props.history.push('/transporter/handle-package')}}>Handle Package</Button>   */}
//                     </div>
//                 </div>
//             </Router>
//         );
//     }
// }
// export default withRouter(Distributor);

import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from '../../main_dashboard/components/Navbars/Navbar';
import Sidebar from "../../main_dashboard/components/Sidebar/Sidebar.js";

import logo from "../../main_dashboard/assets/img/reactlogo.png";
import bgImage from "../../main_dashboard/assets/img/sidebar-2.jpg";
import styles from '../../main_dashboard/assets/jss/material-dashboard-react/layouts/adminStyle.js';

import Dashboard from "@material-ui/icons/Dashboard";
import LocationOn from "@material-ui/icons/LocationOn";
import Person from "@material-ui/icons/Person";
// import AddItem from "@material-ui/icons/AddBox";
import ViewItem from "@material-ui/icons/ViewList";
import ViewTrans from "@material-ui/icons/Visibility";

// import CreateMedicine from './CreateMedicine';
// import RequestProduct from './RequestProduct';
import ViewResponses from '../Events/ViewResponses';
import DistributorReceiveProduct from './DistributorReceiveProduct';
// import ViewRequests from '../Events/ViewRequests';
import DistributorMedicineInfo from './DistributorMedicineInfo';
import DistributorViewReceivedMedicines from './DistributorViewReceivedMedicines';
import RequestProductDistributor from './RequestProduct';
// import ViewTransactions from '../Transactions/ViewTransactions';
import ViewRequests from '../Events/ViewRequests';
import ViewTransactions from '../Transactions/ViewTransactions';

import DistributorDashboard from '../../main_dashboard/views/Dashboard/Dashboard';
import Maps from "../../main_dashboard/views/Maps/Maps.js";
import UserProfile from '../../main_dashboard/views/UserProfile/UserProfile';

// import routes from './ownerRoutes.js';

let ps;

const routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: Dashboard,
        component: DistributorDashboard,
        layout: "/distributor"
    },
    {
        path: "/request-product",
        name: "Request Product",
        icon: ViewItem,
        component: RequestProductDistributor,
        layout: "/distributor"
    },
    {
        path: "/view-responses",
        name: "View Response",
        icon: ViewTrans,
        component: ViewResponses,
        layout: "/distributor"
    },
    {
        path: "/receive-medicine",
        name: "Receive Product",
        icon: ViewTrans,
        component: DistributorReceiveProduct,
        layout: "/distributor"
    },
    {
        path: "/view-medicines",
        name: "View Crops",
        icon: ViewItem,
        component: DistributorViewReceivedMedicines,
        layout: "/distributor"
    },
    {
        path: "/user",
        name: "User Profile",
        icon: Person,
        component: UserProfile,
        layout: "/distributor"
    },
    {
        path: "/maps",
        name: "Maps",
        icon: LocationOn,
        component: Maps,
        layout: "/distributor"
    },
];

const useStyles = makeStyles(styles);

export default function Distributor({ ...rest }) {
    const switchRoutes = (
        <Switch>
            {routes.map((prop, key) => {
                if (prop.layout === "/distributor") {
                    return (
                        <Route
                            path={prop.layout + prop.path}
                            render={() => (
                                <prop.component account={rest.account} supplyChain={rest.supplyChain} web3={rest.web3} />
                            )}
                            key={key}
                        />
                    );
                }
                return null;
            })}

            <Route exact path="/distributor/view-medicine/:id" component={DistributorMedicineInfo} />
            <Route exact path="/distributor/view-request/:id" component={ViewRequests} />
            <Route exact path="/distributor/view-transaction/:id" component={ViewTransactions} />
            <Redirect from="/distributor" to="/distributor/dashboard" />
        </Switch>
    );
    const classes = useStyles();
    const mainPanel = React.createRef();

    const [ image, setImage ] = React.useState(bgImage);
    const [ color, setColor ] = React.useState("blue");
    const [ fixedClasses, setFixedClasses ] = React.useState("dropdown show");
    const [ mobileOpen, setMobileOpen ] = React.useState(false);
    const handleImageClick = image => {
        setImage(image);
    };
    const handleColorClick = color => {
        setColor(color);
    };
    const handleFixedClick = () => {
        if (fixedClasses === "dropdown") {
            setFixedClasses("dropdown show");
        } else {
            setFixedClasses("dropdown");
        }
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const getRoute = () => {
        return window.location.pathname !== "/distributor/maps";
    };
    const resizeFunction = () => {
        if (window.innerWidth >= 960) {
            setMobileOpen(false);
        }
    };

    React.useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false
            });
            document.body.style.overflow = "hidden";
        }
        window.addEventListener("resize", resizeFunction);

        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
            }
            window.removeEventListener("resize", resizeFunction);
        };
    }, [ mainPanel ]);

    return (
        <div className={classes.wrapper}>
            <Sidebar
                routes={routes}
                logoText={"Distributor"}
                logo={logo}
                image={image}
                handleDrawerToggle={handleDrawerToggle}
                open={mobileOpen}
                color={color}
                {...rest}
            />
            <div className={classes.mainPanel} ref={mainPanel}>
                <Navbar
                    routes={routes}
                    handleDrawerToggle={handleDrawerToggle}
                    {...rest}
                />

                {getRoute() ? (
                    <div className={classes.content}>
                        <div className={classes.container}>{switchRoutes}</div>
                    </div>
                ) :
                    (
                        <div className={classes.map}>{switchRoutes}</div>
                    )
                }
            </div>
        </div>
    );
}