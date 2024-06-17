import { RootState } from '@/store/store';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';


interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();
  const { status } = useSelector((state: RootState) => state.auth);

  if (status !== 'authenticated') {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
