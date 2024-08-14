import { asyncFetch } from "./AsyncFetch";
import { errorHandler } from "./ErrorHandler";
import { Service } from "./Service";

class RequestService extends Service {
  constructor() {
    super("acceptor");
    this.endpoints = [
      "searchacceptor", //0
      "updaterequest", //1
      "removedoc", //2
      "getdocbyid", //3
      "getallacceptors", //4
      "makerequest", //5
    ];
  }

  async searchRequests(search, type, isValidReq = undefined) {
    return errorHandler(
      await asyncFetch(
        `${this.url}${this.endpoints[0]}?search=${search}&type=${type}&isValidReq=${isValidReq}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
      "searchRequests"
    );
  }

  async updateRequest(_id, data = {}) {
    if (!data) {
      return;
    }
    return errorHandler(
      asyncFetch(this.url + this.endpoints[1], {
        method: "PUT",
        body: JSON.stringify({
          _id,
          ...data,
        }),
      }),
      "updateRequest"
    );
  }

  async deleteRequest(_id) {
    console.log("request:", _id);
    return errorHandler(
      await asyncFetch(this.url + this.endpoints[2], {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      }),
      "deleteRequest"
    );
  }

  async getReqDocById(_id) {
    return errorHandler(
      asyncFetch(this.url + this.endpoints[3], {
        method: "GET",
        body: JSON.stringify({
          _id,
        }),
      }),
      "getReqDocById"
    );
  }

  async getAllReqDocs(signal) {
    const options = {
      method: "GET",
      credentials: "include",
      signal,
    };
    return errorHandler(
      await asyncFetch(this.url + this.endpoints[4], options),
      "getAllReqDocs"
    );
  }

  async makeRequest(data = {}) {
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    return errorHandler(
      await asyncFetch(this.url + this.endpoints[5], options),
      "makeRequest"
    );
  }
}

export const requestService = new RequestService();
