import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Page/Navbar/Navbar';
import Home from './Page/Home/Home'
import Parts from './Page/Parts/Parts'
import BusinessSummary from './Page/BusinessSummary/BusinessSummary'
import Reviews from './Page/Reviews/Reviews'
import Blog from './Page/Blog/Blog'
import Login from './Page/Login/Login'
import Dashboard from './Page/Dashboard/Dashboard';
import SignUp from './Page/SignUp/SignUp';
import RequireAuth from './Page/RequireAuth/RequireAuth';
import Footer from './Page/Footer/Footer';
import Purchase from './Page/Purchase/Purchase';
import AddReview from './Page/Dashboard/AddReview';
import MyOrders from './Page/Dashboard/MyOrders';
import MyProfile from './Page/Dashboard/MyProfile';
import AddProfileInformation from './Page/Dashboard/AddProfileInformation';
import UpdateProfile from './Page/Dashboard/UpdateProfile';
import AddParts from './Page/Dashboard/AddParts';
import ManageParts from './Page/Dashboard/ManageParts';
import UpdateParts from './Page/Dashboard/UpdateParts';
import Payment from './Page/Dashboard/Payment';
import AllUser from './Page/Dashboard/AllUser';
import RequireAdmin from './Page/RequireAuth/RequireAdmin';

function App() {
  return (
    <div>
      <div style={{ width: '80%', margin: 'auto' }}>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/parts' element={
            <RequireAuth>
              <Parts></Parts>
            </RequireAuth>
          }></Route>
          <Route path='/reviews' element={<Reviews></Reviews>}></Route>
          <Route path='/blog' element={<Blog></Blog>}></Route>
          <Route path='/purchase/:id' element={<Purchase></Purchase>}></Route>
          <Route path='/dashboard' element={
             <RequireAuth>
             <Dashboard></Dashboard>
           </RequireAuth>
          }>
            <Route index element={<AddReview></AddReview>}></Route>
            <Route path='order' element={<MyOrders></MyOrders>}></Route>
            <Route path='payment/:id' element={<Payment></Payment>}></Route>
            <Route path='profile' element={<MyProfile></MyProfile>}></Route>
            <Route path='addProfileInformation' element={<AddProfileInformation></AddProfileInformation>}></Route>
            <Route path='updateProfile/:id' element={<UpdateProfile></UpdateProfile>}></Route>
            <Route path='addParts' element={<RequireAdmin><AddParts></AddParts></RequireAdmin>}></Route>
            <Route path='allUser' element={<RequireAdmin><AllUser></AllUser></RequireAdmin>}></Route>
            <Route path='manageParts' element={<RequireAdmin><ManageParts></ManageParts></RequireAdmin>}></Route>
            <Route path='updateParts/:id' element={<UpdateParts></UpdateParts>}></Route>
          </Route>
          <Route path='/signUp' element={<SignUp></SignUp>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
