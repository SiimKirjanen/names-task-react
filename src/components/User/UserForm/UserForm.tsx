import {
  useForm,
  SubmitHandler,
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "../../../types/user";
import { userSchema } from "../../../schemas/user-schema";
import Spinner from "../../common/Loading/Spinner/Spinner";

type UserFormData = z.infer<typeof userSchema>;

type Props = {
  user: User | null;
  onSave: (userData: Omit<User, "id">, reset: () => void) => void;
  isSaving: boolean;
};

const UserForm = ({ user, onSave, isSaving = false }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user || undefined,
  });
  const onSubmit: SubmitHandler<UserFormData> = (data) => {
    onSave(data, reset);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <InputField
        label="Name"
        type="text"
        register={register("name")}
        error={errors.name}
      />
      <InputField
        label="Username"
        type="text"
        register={register("username")}
        error={errors.username}
      />
      <InputField
        label="Email"
        type="email"
        register={register("email")}
        error={errors.email}
      />
      <InputField
        label="Phone"
        type="text"
        register={register("phone")}
        error={errors.phone}
      />
      <InputField
        label="Website"
        type="text"
        register={register("website")}
        error={errors.website}
      />
      <InputField
        label="Street"
        type="text"
        register={register("address.street")}
        error={errors.address?.street}
      />
      <InputField
        label="Suite"
        type="text"
        register={register("address.suite")}
        error={errors.address?.suite}
      />
      <InputField
        label="City"
        type="text"
        register={register("address.city")}
        error={errors.address?.city}
      />
      <InputField
        label="Zipcode"
        type="text"
        register={register("address.zipcode")}
        error={errors.address?.zipcode}
      />
      <InputField
        label="Latitude"
        type="text"
        register={register("address.geo.lat")}
        error={errors.address?.geo?.lat}
      />
      <InputField
        label="Longitude"
        type="text"
        register={register("address.geo.lng")}
        error={errors.address?.geo?.lng}
      />
      <InputField
        label="Company name"
        type="text"
        register={register("company.name")}
        error={errors.company?.name}
      />
      <InputField
        label="Catch phrase"
        type="text"
        register={register("company.catchPhrase")}
        error={errors.company?.catchPhrase}
      />
      <InputField
        label="Business BS"
        type="text"
        register={register("company.bs")}
        error={errors.company?.bs}
      />
      <div className="col-span-1 md:col-span-2 flex justify-end">
        {isSaving ? (
          <Spinner className="loading-xl" />
        ) : (
          <button type="submit" className="btn btn-primary mt-4">
            Save
          </button>
        )}
      </div>
    </form>
  );
};

type InputFieldProps = {
  label: string;
  type: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
};
const InputField = ({ label, type, register, error }: InputFieldProps) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        className="input input-bordered w-full max-w-xs"
        {...register}
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </label>
  );
};

export default UserForm;
