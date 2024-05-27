import { BrowserRouter } from 'react-router-dom';

import { useAuth } from "../hooks/auth";
import { USER_ROLE } from '../utils/roles';

import { CustumerRoutes } from './custumer.routes';
import { AdminRoutes } from './admin.routes';
import { SaleRoutes } from './sale.routes';
import { AuthRoutes } from './auth.routes';
import { useEffect } from 'react';
import { api } from '../services/api';

export function Routes() {
  const { user, signOut } = useAuth();

  useEffect(() => {
    api
      .get('/users/validated')
      .catch((error) => {
        if(error.response?.status === 401){
          signOut()
        }
      })
  }, [])

  function AccessRouter() {
    switch(user.role) {
      case USER_ROLE.ADMIN:
        return <AdminRoutes />;      
      case USER_ROLE.CUSTUMER:
        return <CustumerRoutes />;
      case USER_ROLE.SALE:
        return <SaleRoutes />;
      default:
        return <CustumerRoutes />
    }
  }

  return (
    <BrowserRouter>
      {user ? <AccessRouter /> : <AuthRoutes />}
    </BrowserRouter>
  );
}