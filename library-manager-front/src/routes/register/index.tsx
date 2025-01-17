import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { RegisterForm } from '../../components/forms';
import { useUserStore } from '../../store/useUserStore';
import { useShallow } from 'zustand/shallow';
import { useEffect } from 'react';

export const Route = createFileRoute('/register/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { role } = useUserStore(
    useShallow((state) => ({
      role: state.role,
    }))
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'guest') {
      navigate({
        to: '/',
      });
    }
  }, [role, navigate]);

  if (role === 'guest') {
    return <RegisterForm />;
  }
  return null;
}
