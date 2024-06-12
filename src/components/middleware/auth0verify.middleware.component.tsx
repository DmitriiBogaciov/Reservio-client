import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import React, { ReactNode, useState } from 'react';
import { useEffect } from 'react';

interface Auth0ErrorComponentProps {
  children?: ReactNode;
}

const Auth0ErrorComponent = ({ children }: Auth0ErrorComponentProps) => {
  return (
    <>
      {children}
    </>
  );
};



const Auth0VerifyMiddleware = ({ children }: { children: React.ReactNode }) => {
  const { user, error, isLoading } = useUser();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchToken = async () => {
    if (!isLoading && !user) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    fetchToken();
  }, [user, isLoading, error]);

  if (error || !user) {
    const errorChildren = React.Children.toArray(children).filter(
      (child) => (child as React.ReactElement).type === Auth0ErrorComponent
    );
    return <>{errorChildren}</>;
  }

  const successChildren = React.Children.toArray(children).filter(
    (child) => (child as React.ReactElement).type !== Auth0ErrorComponent
  );

  return <>{successChildren}</>;
};


export { Auth0VerifyMiddleware, Auth0ErrorComponent };
