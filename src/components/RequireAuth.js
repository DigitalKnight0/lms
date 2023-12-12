import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import React from "react";
const { useLocation, Navigate } = require("react-router-dom");

 const RequireAuth = function (_a) {
    const children = _a.children
    const loginPath = _a.loginPath    
    const location = useLocation()
    const isAuthenticated = useIsAuthenticated()
    const doSignOut = useSignOut()
    React.useEffect(() => {
        if (!isAuthenticated()) {
          // Redirect them to the /login page, but save the current location they
          // were trying to go to when they were redirected. This allows us to
          // send them along to that page after they login, which is a nicer
          // user experience than dropping them off on the home page.
          doSignOut();
        }
    }, [isAuthenticated()]);

    if (!isAuthenticated()) {
        return React.createElement(Navigate, {
        to: loginPath,
        state: {
            from: location
        },
        replace: true
        });
    }

    return children;
};

export default RequireAuth;