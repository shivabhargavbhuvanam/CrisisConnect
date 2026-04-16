// src/auth/AuthRoute.tsx
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setUser } from '../redux/userSlice';
import { Roles } from '../models/Roles';
import { RootState } from '../redux/store';
import * as userService from '../services/user-service';

type authProps = {
    children: ReactNode;
};


// Component for routes that require the user to be signed in
export const RequireAuth = ({ children } : authProps) => {
    
    const dispatch = useDispatch();
    const { isSignedIn, user } = useUser();
    //Fetching to check redux store already has data
    const fethedUserData = useSelector((state: RootState) => state.user);

    useEffect(() => {
        // Updating the redux state, if the user calls the url directly
        if (isSignedIn && fethedUserData.username === null) {
            // fetches the location of the user and places it in the redux
            userService.getUserLocation(user?.username)
                  .then((result) => {dispatch(setUser({ 
                    username: user?.username,
                    emailAddress: user?.emailAddresses[0]?.emailAddress,
                    role: user?.username === 'crisis-connect-admin' ? Roles.ADMIN : Roles.USER,
                    location: Object.keys(result.data).length === 0 ? null : result.data
                }));
            })
        }
    })

    if (isSignedIn === false) {
        // Redirect to landing page if the user is not signed in and trying to access authroized paths
        return <Navigate to="/" replace />;
    }

    return <SignedIn>{children}</SignedIn>;
};



// Component for routes that should only be accessible when signed out
export const RequireNoAuth = ({ children }: authProps) => {

    const { isSignedIn, user } = useUser();
    const dispatch = useDispatch();
    // Fetching to check if redux store already has data
    const fethedUserData = useSelector((state: RootState) => state.user);

    useEffect(() => {
        // Updating the redux state, if the user calls the url directly
        if (isSignedIn && fethedUserData.username === null) {
            userService.getUserLocation(user?.username)
                  .then((result) => {dispatch(setUser({ 
                    username: user?.username,
                    emailAddress: user?.emailAddresses[0]?.emailAddress,
                    role: user?.username === 'crisis-connect-admin' ? Roles.ADMIN : Roles.USER,
                    location: Object.keys(result.data).length === 0 ? null : result.data
                }));
            })
        }
    })


    if (isSignedIn) {
        // Redirect to home if the user is already signed in
        return <Navigate to="/home" replace />;
    }

    return <SignedOut>{children}</SignedOut>;
};
