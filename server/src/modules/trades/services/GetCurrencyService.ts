import axios from "axios";

interface IRequest {
  to: string;
  from: string;
}

export default class GetCurrency {
  public async execute({ to, from }: IRequest) {
    const options = {
      method: "GET",
      url: "https://alpha-vantage.p.rapidapi.com/query",
      params: {
        to_currency: to,
        function: "CURRENCY_EXCHANGE_RATE",
        from_currency: from,
      },
      headers: {
        "X-RapidAPI-Key": "b11c1f79dfmsh828755ae1e94396p136251jsnd771bbc6778c",
        "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
      },
    };
    const apiGetCurrency = await axios(options);
    if (!apiGetCurrency)
      throw new Error("Currency API is not available, try again.");
    const currency = apiGetCurrency.data["Realtime Currency Exchange Rate"];
    return parseFloat(currency["5. Exchange Rate"]);
  }
}
