import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import "./App.css"
import MainPage from "./Main/MainPage"
import DashBoard from "./Main/DashBoard/DashBoard"
import HRMod from "./Main/HR/HRMod"
import SalesMod from "./Main/Sales/SalesMod"
import InboxPage from "./Main/Sales/Inbox/InboxPage"
import Accounts from "./Main/Accounts/Accounts"
import Operations from "./Main/Operations/Operations"
import ManageClientModule from "./Main/ManageClients/ManageClientModule"
import ActivityMasterModule from "./Main/ActivityMaster/ActivityMasterModule"
import QualityModule from "./Main/Quality/QualityModule"
import MyProfile from "./Main/MyProfile/MyProfile"
import ContactModule from "./Main/Sales/Contacts/ContactModule"
import Estimate from "./Main/Sales/Estimate/Estimate"
import LeadsModule from "./Main/Sales/Leads/LeadsModule"
import Opportunities from "./Main/Sales/Opportunities/Opportunities"
import OrdersModule from "./Main/Sales/Orders/OrdersModule"
import CounterExample from "./components/CounterExample"
import Login from "./Login/Login"
import SignUp from "./Login/SignUp"
import LeadDetailsPage from "./Main/Sales/Inbox/LeadDetailsPage"
import HomePage from "./Home/HomePage"
import FrontMainPage from "./Home/FrontMainPage"
import MainLoginRouter from "./Login/MainLoginRouter"
import OtpPage from "./Login/OtpPage"
import ForgetPassword from "./Login/ForgetPassword"
import ChangePassword from "./Login/ChangePassword"
import ForgetOtpPage from "./Login/ForgetOtpPage"
import DisplayDashboardUser from "./Main/DashBoard/DisplayDashboardUser"
import DisplayUserTwo from "./Main/DashBoard/DisplayUserTwo"
import SetNewPasswordPage from "./Login/SetNewPasswordPage"
import LeadCreateModel from "./Model/LeadCreateModel"
import EstimateCreatePage from "./Main/Sales/Leads/EstimateCreatePage"
import TableScalaton from "./components/TableScalaton"
import LeadHistory from "./Main/Sales/Leads/LeadHistory"
import NewGetFile from "./Routes/NewGetFile"
import PaswordUpdateMessage from "./Login/PaswordUpdateMessage"
import ComingSoonPage from "./Home/ComingSoonPage"
import SettingMainPage from "./Main/Setting/SettingMainPage"
import LeadStatusPage from "./Main/Setting/LeadStatus/LeadStatusPage"
import ProductsChange from "./Main/Setting/Products/ProductsChange"
import NotFoundPage from "./components/NotFoundPage"
import LeadCategory from "./Main/Setting/Category/LeadCategory"
import AllNotificationPage from "./Main/Sales/Leads/AllNotificationPage"
import AllDeactivateUser from "./Main/DashBoard/AllDeactivateUser"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/newfile" element={<NewGetFile />}></Route>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />}>
            <Route path="/" element={<FrontMainPage />} />
            <Route path="/contact" element={<div>Contact</div>} />
          </Route>
          <Route path="/counter" element={<CounterExample />} />
          <Route path="/erp" element={<MainLoginRouter />}>
            <Route path="login" element={<Login />} />
            <Route
              path="setpassword/:userid/thankyou"
              element={<PaswordUpdateMessage />}
            />
            <Route path="signup" element={<SignUp />} />
            <Route path="otp" element={<OtpPage />} />
            <Route path="forgetotp" element={<ForgetOtpPage />} />
            <Route path="forgetpassword" element={<ForgetPassword />} />
            <Route path="change" element={<ChangePassword />} />
            <Route path="setpassword/:userid" element={<SetNewPasswordPage />} />
          </Route>

          <Route path="/erp" element={<MainPage />}>
            <Route path=":userid/users" element={<DashBoard />}>
              <Route path="" element={<DisplayDashboardUser />} />
              <Route path="muiuser" element={<DisplayUserTwo />} />
              <Route path="deactivateUser" element={<AllDeactivateUser />} />
              
            </Route>
            {/* hr module routes */}
            <Route path="/erp/:userid/hr" element={<ComingSoonPage />}>
              <Route path="" element={<div>hrlinkone</div>} />
              <Route path="hrlinktwo" element={<div>hrlinktwo</div>} />
              <Route path="hrlinkthree" element={<div>hrlinkthree</div>} />
              <Route path="hrlinkfour" element={<div>hrlinkfour</div>} />
              <Route path="hrlinkfive" element={<div>hrlinkfive</div>} />
              <Route path="hrlinksix" element={<div>hrlinksix</div>} />
            </Route>
            {/* end */}
            {/* slaes module routes */}
            <Route path="/erp/:userid/sales" element={<SalesMod />}>
              <Route path="" element={<InboxPage />} />
              <Route path="scalaton" element={<TableScalaton />} />
              {/* <Route path=":id" element={<LeadDetailsPage />} /> */}

              <Route path="oppurtities" element={<Opportunities />} />
              <Route path="estimate" element={<Estimate />} />
              <Route path="orders" element={<OrdersModule />} />
              <Route path="leads/:leadid" element={<LeadDetailsPage />} />
              <Route
                path="leads/:leadid/estimate"
                element={<EstimateCreatePage />}
              />
              <Route path="contacts" element={<ContactModule />} />
              <Route path="leads/:leadid/history" element={<LeadHistory />} />
              <Route path="leads" element={<LeadsModule />} />
              <Route path="leads/notification" element={<AllNotificationPage />} />
              
            </Route>
            {/* end */}
            {/* accounts module routes */}
            <Route path="/erp/:userid/account" element={<ComingSoonPage />}>
              <Route path="" element={<div>accounts first page</div>} />
              <Route
                path="accounttwo"
                element={<div>account second page</div>}
              />
              <Route
                path="accountthird"
                element={<div>account third page</div>}
              />
              <Route
                path="accountforth"
                element={<div>account forth page</div>}
              />
              <Route
                path="accountfive"
                element={<div>Account five page</div>}
              />
              <Route path="accountsix" element={<div>Account six page</div>} />
            </Route>
            {/* end */}
            {/* operation module Routes */}
            <Route path="/erp/:userid/operation" element={<ComingSoonPage />}>
              <Route path="" element={<div>Operation Number one </div>} />
              <Route
                path="operationtwo"
                element={<div>Operation Number Two</div>}
              />
              <Route
                path="operationthree"
                element={<div>Operation Number Three</div>}
              />
              <Route
                path="operationfour"
                element={<div>Operation Number Four</div>}
              />
              <Route
                path="operationfive"
                element={<div>Operation Number Five</div>}
              />
              <Route
                path="operationsix"
                element={<div>Operation Number Six</div>}
              />
            </Route>
            {/* end */}
            {/* manage client module route */}
            <Route path="/erp/:userid/manageclient" element={<ComingSoonPage />}>
              <Route path="" element={<div>Client Number One</div>} />
              <Route path="clienttwo" element={<div>Client Number Two</div>} />
              <Route
                path="clientthree"
                element={<div>Client Number Three</div>}
              />
              <Route
                path="clientfour"
                element={<div>Client Number Four</div>}
              />
              <Route
                path="clientfive"
                element={<div>Client Number Five</div>}
              />
              <Route path="clientsix" element={<div>Client Number Six</div>} />
            </Route>
            {/* end */}
            {/* Activity Master module routes */}
            <Route path="/erp/:userid/activity" element={<ComingSoonPage />}>
              <Route path="" element={<div>Activity Number One</div>} />
              <Route
                path="activitytwo"
                element={<div>Activity Number Two</div>}
              />
              <Route
                path="activitythree"
                element={<div>Activity Number Three</div>}
              />
              <Route
                path="activityfour"
                element={<div>Activity Number Four</div>}
              />
              <Route
                path="activityfive"
                element={<div>Activity Number Five</div>}
              />
              <Route
                path="activitysix"
                element={<div>Activity Number Six</div>}
              />
            </Route>
            {/* end */}
            {/* quality module routes */}
            <Route path="/erp/:userid/quality" element={<ComingSoonPage />}>
              <Route path="" element={<div>Quality Number One</div>} />
              <Route
                path="qualitytwo"
                element={<div>Quality Number Two</div>}
              />
              <Route
                path="qualitythree"
                element={<div>Quality Number Three</div>}
              />
              <Route
                path="qualityfour"
                element={<div>Quality Number Four</div>}
              />
              <Route
                path="qualityfive"
                element={<div>Quality Number Five</div>}
              />
              <Route
                path="qualitysix"
                element={<div>Quality Number Six</div>}
              />
            </Route>
            {/* end */}
            <Route path="/erp/:userid/setting" element={<SettingMainPage />} >
              <Route path="" element={<LeadStatusPage />} />
              <Route path="products" element={<ProductsChange />} />
              <Route path="category" element={<LeadCategory />} />
            </Route>

            {/* profile routes */}
            <Route path="/erp/:userid/profile" element={<ComingSoonPage />}>
              <Route path="" element={<div>Profile Number One</div>} />
              <Route
                path="profiletwo"
                element={<div>Profile Number Two</div>}
              />
              <Route
                path="profilethree"
                element={<div>Profile Number Three</div>}
              />
              <Route
                path="profilefour"
                element={<div>Profile Number Four</div>}
              />
            </Route>
            {/* end */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
