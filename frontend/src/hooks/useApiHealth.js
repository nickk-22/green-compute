import { useEffect, useState } from "react";
import { getHealth } from "../services/api.js";

export function useApiHealth() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let active = true;
    getHealth()
      .then(() => {
        if (active) setStatus("ok");
      })
      .catch(() => {
        if (active) setStatus("down");
      });
    return () => {
      active = false;
    };
  }, []);

  return status;
}
