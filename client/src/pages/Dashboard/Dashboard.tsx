import "./index.scss";
import OpenTrade from "../../components/OpenTrade/OpenTrade";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import { AxiosResponse } from "axios";

interface IUser {
  name: string;
  email: string;
  wallet: number;
  trades: string[];
}

export default function Dashboard() {
  async function getUserData(token: string) {
    async function getRequest(token: string) {
      return await api.get("/users/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    }
    const userData: AxiosResponse = await toast.promise(getRequest(token), {
      loading: "Loading",
      success: "Welcome!",
      error: "Token wrong. :(",
    });
    return userData.data;
  }

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    wallet: 0,
    trades: [],
  });

  useEffect(() => {
    getUserData(localStorage.token).then((user) =>
      setUserData({
        name: user.name,
        email: user.email,
        wallet: user.wallet,
        trades: user.trades,
      })
    );
  }, []);

  return (
    <div className="bg-dark text-white page-container">
      <header className="header-dashboard">
        <h1>Welcome to your new Forex Trading App</h1>
        <div className="user-personal-data">
          <div className="wallet">
            <span>$ {userData.wallet.toFixed(2)}</span>
            <button>Deposit</button>
          </div>
          <span>Hello {userData.name}</span>
        </div>
      </header>
      <main>
        <OpenTrade />
      </main>
      <footer className="dashboard-footer">
        {userData.trades.map((trade, key) => (
          <p key={key}>{trade}</p>
        ))}
      </footer>
    </div>
  );
}
