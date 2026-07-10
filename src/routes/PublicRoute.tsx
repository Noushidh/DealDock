import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

type Props = {
  children: React.ReactNode;
};

function PublicRoute({ children }: Props) {
  const token = useSelector((state: RootState) => state.auth.token);

  if (token) {
    return <Navigate to="/sell" replace />;
  }

  return children;
}

export default PublicRoute;
