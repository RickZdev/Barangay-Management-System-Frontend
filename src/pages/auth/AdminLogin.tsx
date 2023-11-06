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
    <>
      <LoaderModal isLoading={isLoading} />
      <div className="bg-[#1e1e2f] flex flex-1 justify-center items-center h-screen">
        <Card className="w-[30%]">
          <form
            className="space-y-4 py-2 px-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col justify-center items-center">
              <CardHeader title="Admin Portal" titleSize={30} />
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

            <div className="my-2">
              <NavLink to={"/portal/forgot-password"}>
                <p className="text-white font-poppins text-center">
                  Forgot Password?
                </p>
              </NavLink>
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
    </>
  );
};

export default AdminLogin;
