import Card from "../../components/Card";
import TextField from "../../components/TextField";
import CardHeader from "../../components/CardHeader";
import SubmitButton from "../../components/SubmitButton";
import { useForm } from "react-hook-form";
import useLogin from "../../queries/auth/useLogin";
import PasswordField from "../../components/PasswordField";
import { useEffect, useState } from "react";
import ModalFailed from "../../components/modals/alert/ModalFailed";
import _ from "lodash";
import useAuthContext from "../../queries/auth/useAuthContext";
import LoaderModal from "../../components/modals/loader/LoaderModal";
import { useNavigate } from "react-router-dom";
import { loginFormValidation } from "../../utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useLoginTimer from "../../hooks/useLoginTimer";

const ResidentLogin: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginFormValidation) });
  const { mutateAsync, isLoading: isLoginLoading } = useLogin();
  const { storedTimer, onLoginSuccess, onLoginError } = useLoginTimer();

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const isLoading = isProcessing || isLoginLoading;

  const onSubmit = async (values: any) => {
    setIsProcessing(true);

    const res = await mutateAsync({ ...values });

    console.log(values);
    console.log(res, "gg");

    if (res.data) {
      localStorage.setItem("userId", JSON.stringify(res.data._id)!);
      localStorage.setItem("userRole", JSON.stringify("Resident")!);
      localStorage.setItem("accessToken", JSON.stringify(res.data.token)!);

      auth.setUserId(res.data._id);
      auth.setUserRole("Resident");
      auth.setAccessToken(res.data.token);
      onLoginSuccess();

      console.log("User Logged In Successfully!");
      navigate("/dashboard", { replace: true });
    } else {
      setShowErrorModal(true);
      onLoginError();
    }

    setIsProcessing(false);
  };

  useEffect(() => {
    const token = localStorage?.getItem("accessToken")
      ? JSON.parse(localStorage?.getItem("accessToken")!)
      : null;

    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <LoaderModal isLoading={isLoading} />
      <div className="bg-[#1e1e2f] flex flex-1 justify-center items-center h-screen">
        <Card className="w-[30%]">
          <form
            className="space-y-4 py-2 px-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col justify-center items-center">
              <CardHeader title="Resident Portal" titleSize={30} />
            </div>
            <h1 className="text-white text-sm text-center">
              Sign in to start your session
            </h1>
            <TextField
              label="Username"
              isEdit
              register={register("username")}
              error={errors?.username?.message}
            />
            <div className="mb-10">
              <PasswordField
                label="Password"
                isEdit
                register={register("password")}
                error={errors?.password?.message}
              />
            </div>
            <div className="mt-5">
              <SubmitButton label="Sign In" isButtonDisabled={!!storedTimer} />

              {storedTimer && (
                <p className="text-red-500 text-xs mt-5 font-poppins font-bold text-center">
                  You have been locked out. You can try again after{" "}
                  {storedTimer}
                </p>
              )}
            </div>
          </form>
        </Card>
      </div>

      <ModalFailed
        open={showErrorModal}
        title={!storedTimer ? "Login Failed" : "You have been locked out"}
        buttonLabel="Okay"
        description={
          !storedTimer
            ? "Your username or password is incorrect. Please try again."
            : "Please try again after 15 minutes."
        }
        handleButtonPress={() => setShowErrorModal(false)}
      />
    </>
  );
};

export default ResidentLogin;
