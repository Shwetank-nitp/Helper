import { asyncFetch } from "./AsyncFetch";
import { errorHandler } from "./ErrorHandler";
import { Service } from "./Service";

class MatchService extends Service {
  constructor() {
    super("matchup");
    this.endpoints = [
      "doneraccept", //0
      "getallbyaccepteddonations", //1
      "getallfullfilledrequests", //2
    ];
  }
  async conformDonation(donationDocId, acceptorDocId) {
    const options = {
      credentials: "include",
      body: JSON.stringify({
        donerDocId: donationDocId,
        acceptorDocId: acceptorDocId,
      }),
      method: "POST",
    };
    return errorHandler(
      asyncFetch(this.url + this.endpoints[0], options),
      "conformDonation"
    );
  }

  async getMyConformedReqs() {
    const options = {
      method: "GET",
      credentials: "include",
    };
    return errorHandler(
      asyncFetch(this.url + this.endpoints[2], options),
      "getMyConformedReqs"
    );
  }

  async getMyConformedDons() {
    const options = {
      method: "GET",
      credentials: "include",
    };

    return errorHandler(
      asyncFetch(this.url + this.endpoints[1], options),
      "getMyConformedDons"
    );
  }
}

export const matchService = new MatchService();
