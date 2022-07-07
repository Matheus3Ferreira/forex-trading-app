import axios, { AxiosResponse } from "axios";

interface IResponse {
  symbol: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
}

export default class GetCurrencyService {
  public async execute() {
    const response: AxiosResponse<IResponse> = await axios.get(
      "https://api.binance.com/api/v3/ticker/bookTicker?symbol=GBPUSDT"
    );
    return {
      bidPrice: parseFloat(response.data.bidPrice),
      askPrice: parseFloat(response.data.askPrice),
    };
  }
}
