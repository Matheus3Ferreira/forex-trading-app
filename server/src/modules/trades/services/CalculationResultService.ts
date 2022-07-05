interface ICalculationParams {
  openValueTrade: number;
  closeValueTrade: number;
  type: string;
  volume: number;
}

export default class CalculationResultService {
  public async execute({
    openValueTrade,
    closeValueTrade,
    type,
    volume,
  }: ICalculationParams) {
    return type == "buy"
      ? (closeValueTrade - openValueTrade) * (volume * 100000)
      : (openValueTrade - closeValueTrade) * (volume * 100000);
  }
}
