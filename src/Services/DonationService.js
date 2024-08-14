import { asyncFetch } from "./AsyncFetch";
import { errorHandler } from "./ErrorHandler";
import { Service } from "./Service";

class DonationService extends Service {
  constructor() {
    super("donations");
    this.endpoints = [
      "removedoner", //0
      "seatchdoner", //1
      "updatedetails", //2
      "getdoenrbyid", //3
      "getalldoners", //4
      "makedonations", //5
    ];
  }

  async makeDonation(data) {
    console.log(data);
    return errorHandler(
      await asyncFetch(this.url + this.endpoints[5], {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
      "makeDonation"
    );
  }

  async updateDonation(_id, data = {}) {
    if (!data) {
      return;
    }
    return errorHandler(
      asyncFetch(this.url + this.endpoints[2], {
        method: "PUT",
        body: JSON.stringify({
          _id,
          ...data,
        }),
      }),
      "updateDonation"
    );
  }

  async removeDonation(_id) {
    console.log(_id);
    return errorHandler(
      await asyncFetch(this.url + this.endpoints[0], {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      }),
      "removeDonation"
    );
  }

  async searchDonation(search, type, isAvalable = undefined) {
    return errorHandler(
      await asyncFetch(
        `${this.url}${this.endpoints[1]}?search=${search}&type=${type}&isAvalable=${isAvalable}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
        "searchDonation"
      )
    );
  }

  async getAllDonDocs(signal) {
    return errorHandler(
      await asyncFetch(this.url + this.endpoints[4], {
        method: "GET",
        credentials: "include",
        signal: signal,
      }),
      "getAllDonDocs"
    );
  }

  async getDonDocById(id) {
    return errorHandler(
      asyncFetch(this.url + this.endpoints[3] + `?_id=${id}`, {
        method: "GET",
      }),
      "getDonDocById"
    );
  }
}

export const donationService = new DonationService();
