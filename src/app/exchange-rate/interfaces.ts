export interface Currency {
  time_last_update_utc: string;
  time_next_update_utc: string;
  base_code: string;
  rates: {
    [key: string]: number;
  };
}

export type Rate = {
  currency: string;
  rate: number;
};
