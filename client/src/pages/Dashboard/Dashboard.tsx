import "./index.scss";
import OpenTrade from "../../components/OpenTrade/OpenTrade";
import { useEffect, useState } from "react";
import DepositModal from "../../components/DepositModal/DepositModal";
import getUserData from "./getUserData";
import socket from "../../services/socket";
import OpenedTableTrades from "../../components/OpenedTableTrades/OpenedTableTrades";
import { Spinner } from "react-bootstrap";

interface ITrade {
  _id: string;
  volume: number;
  openValueTrade: number;
  type: string;
  symbol: string;
  user: string;
  openAt: Date;
  closeAt: Date;
  closeValueTrade: number;
  result: number;
}

interface IUser {
  name: string;
  email: string;
  wallet: number;
  trades: ITrade[];
}

interface ICurrency {
  bidPrice: number;
  askPrice: number;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<IUser>({
    name: "",
    email: "",
    wallet: 0,
    trades: [],
  });

  const [currency, setCurrency] = useState<ICurrency>({
    bidPrice: 0,
    askPrice: 0,
  });

  const [symbol, setSymbol] = useState<string>("");
  const [wallet, setWallet] = useState<number>(userData.wallet);

  socket.on("connect", () => {
    console.log("[IO] Connection sucessfully established");
  });

  const [intervalId, setIntervalId] = useState<any>({});

  useEffect(() => {
    async function getData() {
      await getUserData(localStorage.token).then(({ user, trades }: any) =>
        setUserData({
          name: user.name,
          email: user.email,
          wallet: user.wallet,
          trades: trades,
        })
      );
    }
    getData();
  }, []);

  useEffect(() => {
    setUserData({ ...userData, wallet: wallet });
  }, [wallet]);

  useEffect(() => {
    clearInterval(intervalId);

    if (symbol) {
      const interval = setInterval(() => {
        socket.emit("get-currency", symbol);
        socket.on("get-currency", (currencyData) => {
          setCurrency({
            askPrice: parseFloat(currencyData.askPrice.toFixed(4)),
            bidPrice: parseFloat(currencyData.bidPrice.toFixed(4)),
          });
        });
      }, 1000);
      setIntervalId(interval);
    }
  }, [symbol]);

  if (userData.name == "")
    return (
      <div className="loading-page bg-dark text-white">
        <h1>Loading...</h1>
        <Spinner animation="border" variant="light" />
      </div>
    );

  return (
    <div className="bg-dark text-white page-container">
      <header className="header-dashboard">
        <h1>Forex Trading App</h1>
        <div className="user-personal-data">
          <div className="wallet">
            <span className="amount-value">$ {userData.wallet.toFixed(2)}</span>
            <DepositModal />
          </div>
          <span>Hello {userData.name}</span>
        </div>
      </header>
      <main className="main-content bg-dark text-white">
        <OpenTrade
          symbol={setSymbol}
          currency={currency}
          setUserData={setUserData}
          userData={userData}
          setWallet={setWallet}
        />
      </main>
      <footer className="dashboard-footer table-responsive bg-dark text-white">
        <OpenedTableTrades
          trades={userData.trades}
          currency={currency}
          symbol={symbol}
          setWallet={setWallet}
        />
      </footer>
    </div>
  );
}
