import { asyncFetch } from "./AsyncFetch";
import { errorHandler } from "./ErrorHandler";
import { Service } from "./Service";

class AuthService extends Service {
  constructor() {
    super("auth");
    this.endpoints = [
      "create", //0
      "deleteaccount", //1
      "sendmailconf", //2
      "updateimage", //3
      "updateinfo", //4
      "getaccountinfo", //5
      "logout", //6
      "login", //7
    ];
  }

  async login(email = "", password = "") {
    const data = { email, password };
    return errorHandler(
      await asyncFetch(this.url + this.endpoints[7], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      }),
      "login"
    );
  }

  async logout() {
    return errorHandler(
      await asyncFetch(this.url + this.endpoints[6], {
        method: "POST",
        credentials: "include",
      }),
      "logout"
    );
  }

  async createAccount(data) {
    if (!data) {
      return;
    }
    return errorHandler(
      await asyncFetch(this.url + this.endpoints[0], {
        method: "POST",
        body: data,
        credentials: "include",
      }),
      "createAccount"
    );
  }

  async updateAccountInfo(data = {}) {
    if (!data) {
      return;
    }
    return errorHandler(
      await asyncFetch(this.url + this.endpoints[4], {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
      "updateAccountInfo"
    );
  }

  async updateProfilePicture(file) {
    // provide the file
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("avatar", file);
    return errorHandler(
      await asyncFetch(this.url + this.endpoints[3], {
        method: "PUT",
        credentials: "include",
        body: formData,
      }),
      "updateProfilePicture"
    );
  }

  async deleteAccount() {
    return errorHandler(
      await asyncFetch(this.url + this.endpoints[1], {
        method: "DELETE",
        credentials: "include",
      }),
      "deleteAccount"
    );
  }

  async getAccount() {
    return errorHandler(
      await asyncFetch(this.url + this.endpoints[5], {
        credentials: "include",
        method: "GET",
      }),
      "getAccount"
    );
  }
}

export const authService = new AuthService();
