import toast from "react-hot-toast";

interface IFormData {
  fullName?: string | undefined;
  email: string;
  password: string;
}

export default function ValidationFormData({
  fullName = undefined,
  email,
  password,
}: IFormData): boolean {
  // If don't want to validate fullName, just pass.
  if (fullName != undefined) {
    if (fullName.trim() === "") {
      toast.error("Full name is not valid.");
      return false;
    }
  }
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!regex.test(email) || !email) {
    toast.error("Email is not valid.");
    return false;
  }
  if (password.trim() === "") {
    toast.error("Password is not valid.");
    return false;
  }
  return true;
}
