"use client";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/app/Utils/constants";
import Button from "./Button";

const LogoutButton = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
        await axios.get(`${DOMAIN}/api/users/logout`);
        router.push("/login");
        router.refresh();
    } catch (error) {
        toast.warning("Something went wrong");
        console.log(error);
    }
  }

  return (
    <Button onClick={logoutHandler} className="bg-gray-700 hover:bg-gray-800 text-gray-200 px-3 py-2 rounded">
        Logout
    </Button>
  )
}

export default LogoutButton