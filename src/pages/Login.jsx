import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const { session, signIn, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (session) {
    const redirectTo = location.state?.from?.pathname ?? "/";
    return <Navigate to={redirectTo} replace />;
  }

  const canSubmit = email.trim().length > 0 && password.length > 0 && !submitting;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    const success = await signIn(email.trim(), password);
    setSubmitting(false);

    if (success) {
      const redirectTo = location.state?.from?.pathname ?? "/";
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <form className="loginContainer" onSubmit={handleSubmit}>
      <Stack gap="md" className="loginForm">
        <Title order={1}>Log in</Title>
        <TextInput
          label="Email"
          size="lg"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          autoComplete="username"
        />
        <PasswordInput
          label="Password"
          size="lg"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          autoComplete="current-password"
        />
        {error && (
          <Alert color="red" variant="light" py={6}>
            {error}
          </Alert>
        )}
        <Button type="submit" disabled={!canSubmit} loading={submitting}>
          Log in
        </Button>
      </Stack>
    </form>
  );
}
