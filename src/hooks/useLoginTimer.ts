import { useEffect, useState } from "react";
import { loginAttemptsNotify } from "../helper/toastNotifications";

const useLoginTimer = () => {
  const storedTimer = localStorage.getItem("loginTimer");
  const storedAttempts = localStorage.getItem("loginAttempts");

  const [timer, setTimer] = useState(
    parseInt(JSON.parse(JSON.stringify(storedTimer)), 10)
  );
  const [isTimerActive, setIsTimerActive] = useState(timer > 0);
  const [attempts, setAttempts] = useState(
    parseInt(JSON.parse(JSON.stringify(storedAttempts)) || "0", 10)
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
        localStorage.setItem("loginTimer", JSON.stringify(timer - 1));
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
      setAttempts(0);
      localStorage.removeItem("loginTimer");
      localStorage.removeItem("loginAttempts"); // Remove timer and attempts from storage when timer reaches 0
    }

    return () => clearInterval(interval);
  }, [timer, isTimerActive]);

  const onLoginSuccess = () => {
    // Reset timer and attempts after successful login
    setTimer(0);
    setAttempts(0);
    localStorage.removeItem("loginTimer");
    localStorage.removeItem("loginAttempts"); // Remove timer and attempts from storage
  };

  const onLoginError = () => {
    // Wrong login attempt logic
    setAttempts(attempts + 1);
    localStorage.setItem("loginAttempts", JSON.stringify(attempts + 1)); // Store attempts in storage
    if (attempts >= 4 && !isTimerActive) {
      setTimer(30); // should be 15 minutes in seconds
      setIsTimerActive(true);
      localStorage.setItem("loginTimer", "30"); // Store timer in storage
    } else {
      loginAttemptsNotify(4 - attempts);
    }
  };

  const formatTime = (seconds: number) => {
    if (seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`;
    }
  };

  return {
    onLoginSuccess,
    onLoginError,
    storedTimer: formatTime(parseInt(storedTimer ?? "")),
  };
};

export default useLoginTimer;
