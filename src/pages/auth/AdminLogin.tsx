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
import useGetAdmins from "../../queries/admin/useGetAdmins";
import useAuthContext from "../../queries/auth/useAuthContext";
import LoaderModal from "../../components/modals/loader/LoaderModal";
import { NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormValidation } from "../../utils/validation";
import useLoginTimer from "../../hooks/useLoginTimer";
import { loginSuccessNotify } from "../../helper/toastNotifications";
import BackButton from "../../components/BackButton";
import BarangayLogo from "../../assets/logo/barangay-logo.png";
import CardPhoto from "../../components/CardPhoto";
import { COLORS } from "../../constants/COLORS";
import CustomButton from "../../components/CustomButton";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginFormValidation) });
  const { data: adminAccounts, isLoading: isGetAdminLoading } = useGetAdmins();
  const { mutateAsync, isLoading: isLoginLoading } = useLogin();
  const { storedTimer, onLoginSuccess, onLoginError } = useLoginTimer();

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showNotVerifiedModal, setShowNotVerifiedModal] =
    useState<boolean>(false);
  const [showAccountNotFound, setShowAccountNotFound] =
    useState<boolean>(false);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const isLoading = isProcessing || isGetAdminLoading || isLoginLoading;

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const onSubmit = async (values: any) => {
    setIsProcessing(true);

    const res = await mutateAsync({ ...values });

    console.log(values);
    console.log(res, "gg");

    const isAdmin = _.find(
      adminAccounts,
      (admin) => admin?._id === res?.data?._id
    );

    if (res.data) {
      if (isAdmin) {
        localStorage.setItem("userId", JSON.stringify(res.data?._id)!);
        localStorage.setItem("userRole", JSON.stringify(res.data?.userRole)!);
        localStorage.setItem("accessToken", JSON.stringify(res.data?.token)!);

        auth.setUserId(res.data?._id);
        auth.setUserRole(res.data?.userRole);
        auth.setAccessToken(res.data?.token);
        onLoginSuccess();

        console.log("User Logged In Successfully!");
        loginSuccessNotify(res.data?.userRole);
        navigate("/dashboard", { replace: true });
      } else {
        console.log("Admin Account Not Found");
        setShowAccountNotFound(true);
      }
    } else if (res.error === "Resident not verified yet.") {
      setShowNotVerifiedModal(true);
      onLoginSuccess();
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
      navigate("/dashboard", { replace: true });
    }
  }, []);

  return (
    <div className="LoginForm loginForm-background">
      <LoaderModal isLoading={isLoading} />
      <div className={"container"} id="container">
        <div className="absolute flex flex-1 px-6 py-6 z-50">
          <BackButton handleNavigate={() => handleNavigation("/")} />
        </div>

        <div className="form-container sign-in-container bg-white justify-center flex items-center px-32 ">
          <form className="space-y-4 py-16" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row justify-center items-center space-x-2">
              <CardPhoto image={BarangayLogo} size={120} showTooltip={false} />

              <h1 className="uppercase text-3xl font-bold text-black">
                Barangay Navotas East Management System
              </h1>
            </div>

            <TextField
              label="Username"
              placeholder="Enter your username"
              isEdit
              register={register("username")}
              error={errors?.username?.message}
            />
            <div className="mb-10">
              <PasswordField
                label="Password"
                placeholder="Enter your password"
                isEdit
                register={register("password")}
                error={errors?.password?.message}
              />
            </div>

            <div className="mt-5">
              <SubmitButton
                label="Sign In"
                isButtonDisabled={!!storedTimer}
                backgroundColor={COLORS.secondary}
              />

              {storedTimer && (
                <p className="text-secondary text-xs mt-5 font-bold text-center">
                  You have been locked out. You can try again after{" "}
                  {storedTimer}
                </p>
              )}
            </div>

            <div className="my-2">
              <div
                onClick={() => handleNavigation("/portal/forgot-password")}
                className="cursor-pointer"
              >
                <p className="text-black font-poppins text-center text-sm underline ">
                  Forgot your password?
                </p>
              </div>
            </div>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <CardPhoto image={BarangayLogo} size={300} showTooltip={false} />
              <h1 className="text-white uppercase font-bold text-[42px]">
                ADMIN PORTAL
              </h1>
            </div>
          </div>
        </div>
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

      <ModalFailed
        open={showAccountNotFound}
        title={"Admin account is unnregistered or unrecognized"}
        buttonLabel="Okay"
        description={"You are not authorized to proceed."}
        handleButtonPress={() => setShowAccountNotFound(false)}
      />

      <ModalFailed
        open={showNotVerifiedModal}
        title={"Account Still Processing"}
        buttonLabel="Okay"
        description={
          "Your account still not verified. Please contact barangay official for more information."
        }
        handleButtonPress={() => setShowNotVerifiedModal(false)}
      />
    </div>
  );
};

export default AdminLogin;
