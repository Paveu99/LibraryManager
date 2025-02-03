import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { AdminHeader } from '../../components/header'
import { useUserStore } from '../../store/useUserStore';
import { useShallow } from 'zustand/shallow';
import { useEffect } from 'react';

export const Route = createFileRoute('/admin/_wrapper')({
  component: RouteComponent,
})

function RouteComponent() {

  const { role } = useUserStore(
    useShallow((state) => ({
      role: state.role,
    }))
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'admin') {
      navigate({
        to: '/',
      });
    }
  }, [role, navigate]);

  return <div>
    <AdminHeader />
    <Outlet />
  </div>
}
