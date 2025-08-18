import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import VerifyEmailTemplate from "../../templates/VerifyEmailTemplate";

const VerifyEmail = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Token not found in link");
      return;
    }

    fetch(`/api/auth/verify-email?token=${token}`)
      .then((res) => res.text())
      .then((data) => {
        setStatus("success");
        setMessage(data);

        setTimeout(() => navigate("/sign-in"), 3000);
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
        setMessage("Verification error or token expired");
      });
  }, [searchParams, navigate]);


  return <VerifyEmailTemplate message={message} status={status}/>;
};

export default VerifyEmail;
