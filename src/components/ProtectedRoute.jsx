import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Flex, Loader } from "@mantine/core";
import { useAuth } from "../context/AuthContext";
import { TweetsProvider } from "../context/TweetsContext";

export default function ProtectedRoute() {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Flex justify="center" mt="xl">
        <Loader />
      </Flex>
    );
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <TweetsProvider>
      <Outlet />
    </TweetsProvider>
  );
}
