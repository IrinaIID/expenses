export class Currency {
  timeLastUpdateUtc!: string;
  timeNextUpdate!: string;
  baseCode?: string;
  rates!: Rate[];

  static fromJson(json: any): Currency | undefined {
    if (!json) {
      return undefined;
    }
    const newC = new Currency();
    Object.assign(newC, json);
    newC.timeLastUpdateUtc = json.time_last_update_utc;
    newC.timeNextUpdate = json.time_next_update_utc;
    newC.baseCode = json.base_code;
    newC.rates = Object.keys(json.rates).map((key) => ({ currency: key, value: +json.rates[key] }));
    return newC;
  }
}

export type Rate = {
  currency: string;
  value: number;
};
