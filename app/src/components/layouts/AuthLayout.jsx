import { Suspense } from 'react';
import { Await, useLoaderData, useOutlet } from 'react-router-dom';
import AuthProvider from 'src/components/providers/AuthProvider';

export default function AuthLayout() {
  const outlet = useOutlet();
  const { userPromise } = useLoaderData();

  return (
    <Suspense fallback={<></>}>
      <Await 
        resolve={userPromise}
        errorElement={<></>}
        children={(user) => (
          <AuthProvider userData={user}>
            {outlet}
          </AuthProvider>
        )}
      />
    </Suspense>
  );
}