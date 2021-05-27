import CategoryInterface from './components/category/CategoryInterface'
import DisplayAll from './components/category/DisplayAll'
import DisplayFormat from './components/category/DisplayFormat'
import AdminLogin from './components/Admin/AdminLogin'
import Dashboard from './components/Admin/Dashboard'
import DashboardList from './components/Admin/DashboardList'
import Brands from './components/brand/Brands'
import ModelInterface from './components/model/ModelInterface'
import DisplayModel from './components/model/DisplayModel'
import Displaybrand from './components/brand/Displaybrand'
import {BrowserRouter as Router,Route} from "react-router-dom"
import ProductInterface from  './components/product/ProductInterface'
import ProductPictureInterface from  './components/ProductPicture/ProductPictureInterface'
import ProductDisplay from  './components/product/ProductDisplay'
import MainPages from  './components/clientview/MainPages'
import Home from "./components/clientview/Home"



function App(props) {
  return (
    <div>
      <Router>
         <Route exact strict component={CategoryInterface} path="/categoryinterface" history={props.history} />
         <Route exact strict component={DisplayFormat} path="/DisplayFormat" history={props.history} />
         <Route exact strict component={Brands} path="/brandinterface" history={props.history} />
         <Route exact strict component={Displaybrand} path="/displaybrand" history={props.history} />
         <Route exact strict component={ModelInterface} path="/modelinterface" history={props.history} />
         <Route exact strict component={DisplayModel} path="/displaymodel" history={props.history} />
         <Route exact strict component={AdminLogin} path="/adminlogin" history={props.history} />
         <Route exact strict component={DashboardList} path="/DashboardList" history={props.history} />       
         <Route exact strict component={Dashboard} path="/Dashboard" history={props.history} />
         <Route exact strict component={ProductInterface} path="/productinterface" history={props.history} />
         <Route exact strict component={ProductPictureInterface} path="/productpictureinterface" history={props.history} />
        <Route exact strict component={ProductDisplay} path="/productdisplay" history={props.history} />
        <Route exact strict component={MainPages} path="/mainpages" history={props.history} />
        <Route exact strict component={Home} path="/Home" history={props.history} />
        
  
  
  
      </Router>
    </div>
  );
}

export default App;
