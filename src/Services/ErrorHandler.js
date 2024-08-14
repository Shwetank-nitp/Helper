import { ErrorService } from "./Error";

function errorHandler(json, name = "function") {
  try {
    if (json?.code === 500) {
      throw new ErrorService("Internal Server Error", json);
    } else if (!json?.status) {
      throw new ErrorService("fasle status", json);
    }
    return json;
  } catch (error) {
    console.log("error in " + name);
    throw error;
  }
}

export { errorHandler };
