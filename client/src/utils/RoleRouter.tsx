import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleRouter = ({ role, allowed, children }: any) => {
  if (!allowed.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRouter;
