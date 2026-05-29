import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import PageWrapper from './PageWrapper';

// Prevents logged-in users from accessing login/register
export const PublicRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return null;
  if (isAuthenticated) return <Navigate to={isAdmin ? "/admin" : "/dashboard"} replace />;
  return <Outlet />;
};

// Student routes — no wrapper, each page handles its own layout/navbar
export const StudentRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// Student routes that need PageWrapper (pages without their own navbar)
export const StudentRouteWrapped = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? (
    <PageWrapper><Outlet /></PageWrapper>
  ) : (
    <Navigate to="/login" replace />
  );
};

// Dark-theme protected routes (uses PageWrapper)
export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? (
    <PageWrapper><Outlet /></PageWrapper>
  ) : (
    <Navigate to="/login" replace />
  );
};

// Admin-only routes
export const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/dashboard" replace />;
};
