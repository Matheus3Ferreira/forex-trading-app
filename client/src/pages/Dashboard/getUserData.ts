import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import api from "../../services/api";

interface ITrade {
  _id: string;
  volume: number;
  openValueTrade: number;
  type: string;
  symbol: string;
  user: string;
  openAt: Date;
  closeAt?: Date;
  closeValueTrade?: number;
  result?: number;
}

interface IResponse {
  user: {
    name: string;
    email: string;
    wallet: number;
    trades: ITrade[];
  };
  trades: ITrade[];
}

export default async function getUserData(token: string): Promise<IResponse> {
  async function getRequest(token: string) {
    return await api.get("/users/", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
  async function getTradesData(token: string) {
    return await api.get("/trades/", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
  const userData: AxiosResponse = await toast.promise(getRequest(token), {
    loading: "Loading",
    success: "Welcome!",
    error: "Something goes wrong. :(",
  });
  const trades = await getTradesData(token);
  const responseData = {
    user: userData.data,
    trades: trades.data,
  };
  return responseData;
}
