import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { observable } from "mobx";
import i18n from "utils/i18n";
import Store from ".";

export default class ApiStore {
  @observable BASE_URL: string | any = process.env.API_BASE_URL;

  constructor(private store: Store) {
    this.store;
  }

  public fetch = async (
    {
      method = "get",
      url = "",
      form,
    }: {
      url: string;
      method?: "get" | "post" | "put" | "delete";
      form?: {
        [x: string]: any;
      };
      auth?: boolean;
    },
    expected?: number,
  ): Promise<any> => {
    const config: any = {
      data: form || {},
      headers: {
        Accept: "*/*",
        "Accept-Language": i18n?.language || "en",
        "Content-Type": "application/ld+json",
      },
      method,
      url: `${this.BASE_URL}${url}`,
    };

    return new Promise(async (resolve, reject) => {
      await axios(config)
        .then(({ data, status, headers }) => ({ data, status, headers }))
        .then(({ data, status, headers }) => {
          expected ? (expected === status ? resolve(data) : null) : resolve({ data, status, headers });
        })
        .catch(async ({ response: { data = null, status = 400 } = {} } = {}) => {
          if ([404, 403].includes(status)) {
            if (typeof window !== "undefined") {
              window.location.href = "/404";
            }

            return;
          }

          resolve({ data, status });
          reject({ data, status });
        });
    });
  };
}
