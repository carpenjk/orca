import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'animate.css';

import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import Login from 'routes/Login';
import Dashboard from 'routes/Dashboard';
import Manage from 'routes/Manage';
import Workflow from 'routes/Workflow';
import Layout from 'features/ui/layout/Layout';
import ProtectedRoute from 'routes/ProtectedRoute';
import Logout from 'routes/Logout';
import Register from 'routes/Register';
import NewWorkflow from 'routes/NewWorkflow';
import EditWorkflow from 'routes/EditWorkflow';
import { SidebarProvider } from 'features/sidebar';

function App() {
  return (
    <SidebarProvider>
      <div className="w-full min-h-screen min-w-screen App dark:bg-dk-primary-9 bg-primary-8" >
        <BrowserRouter> 
          <Routes >
            <Route path="/" element={<Layout />}>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/logout" element={<Logout/>}></Route>
              <Route path="/register" element={<Register/>}></Route>
              <Route element={<ProtectedRoute/>}>
                <Route path="/" element={<Dashboard/>}></Route>
                <Route path="/manage" element={<Manage/>}></Route>
                <Route path="/workflow" element={<Workflow/>}></Route>
                <Route path="/workflow/new" element={<NewWorkflow/>}></Route>
                <Route path="/workflow/:workflowID" element={<EditWorkflow/>}></Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </SidebarProvider>
  );
}

export default App;