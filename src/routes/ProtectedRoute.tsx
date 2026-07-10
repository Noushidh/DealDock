import { Navigate } from "react-router-dom";
import type { RootState } from "../app/store";
import { useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const token = useSelector((state: RootState) => state.auth.token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default ProtectedRoute;
