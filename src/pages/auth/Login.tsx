import Card from "../../components/Card";
import TextField from "../../components/TextField";
import CardHeader from "../../components/CardHeader";
import SubmitButton from "../../components/SubmitButton";
import { useForm } from "react-hook-form";
import useLogin from "../../queries/auth/useLogin";

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const { mutate } = useLogin();
  const onSubmit = (values: any) => {
    mutate({ ...values });
  };

  return (
    <div className="bg-[#1e1e2f] flex flex-1 justify-center items-center h-screen">
      <Card className="w-[25%]">
        <form className="space-y-4 py-2 px-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center items-center">
            <CardHeader title="Resident Portal" titleSize={30} />
          </div>
          <h1 className="text-white text-sm text-center">
            Sign in to start your session
          </h1>
          <TextField
            label="Username"
            isEdit
            register={register}
            name="username"
          />
          <div className="mb-10">
            <TextField
              label="Password"
              isEdit
              isPasswordField
              register={register}
              name="password"
            />
          </div>
          <div className="mt-5">
            <SubmitButton label="Sign In" />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;