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

export default async function getUserData(
  token: string,
  filters: string[] | void
): Promise<IResponse> {
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
  async function getTradeDataFilter(token: string, filters: string[]) {
    return await api.get("/trades/", {
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: {
        filters,
      },
    });
  }
  const userData = await getRequest(token);

  const trades = !filters
    ? await getTradesData(token)
    : await getTradeDataFilter(token, filters);
  const responseData = {
    user: userData.data,
    trades: trades.data,
  };
  return responseData;
}
