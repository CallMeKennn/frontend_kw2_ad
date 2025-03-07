import { Config } from "./constants/configs";

const CONST = {
  REQUEST: {
    API_ADDRESS: Config.API_SERVER,
    REQUEST_TIMEOUT: 3000000,
  },
  STORAGE: {
    ACCESS_TOKEN: "ACCESS_TOKEN",
    REFRESH_TOKEN: "REFRESH_TOKEN",
    USER: "ADMIN",
  },
  REMAINING_TIME: 120,
};

export default CONST;
