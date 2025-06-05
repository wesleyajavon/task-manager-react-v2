import { useMemo } from "react";

export function useUser() {
  const token = localStorage.getItem("token");

  const user = useMemo(() => {
    if (!token) return null;

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (err) {
      console.error("Failed to parse token", err);
      return null;
    }
  }, [token]);

  return user;
}
