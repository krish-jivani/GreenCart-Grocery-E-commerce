import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const RedirectToLogin = ({ fromPath }) => {
  const navigate = useNavigate();
  const { setShowUserLogin } = useAppContext();

  useEffect(() => {
    setShowUserLogin(true);
    navigate("/", { replace: true, state: { from: fromPath } });
  }, [fromPath, navigate, setShowUserLogin]);

  return null;
};

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  const location = useLocation();

  if (!user) {
    return <RedirectToLogin fromPath={location.pathname} />;
  }

  return children;
};

export default ProtectedRoute;
