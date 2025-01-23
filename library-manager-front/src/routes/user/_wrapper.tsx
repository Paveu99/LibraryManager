import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { UserHeader } from '../../components/header'
import { useUserStore } from '../../store/useUserStore';
import { useShallow } from 'zustand/shallow';
import { useEffect } from 'react';
import '../../index.scss'

export const Route = createFileRoute('/user/_wrapper')({
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
    if (role !== 'client') {
      navigate({
        to: '/',
      });
    }
  }, [role, navigate]);

  return (
    <div className='details'>
      <UserHeader />
      <Outlet />
    </div>
  )
}
