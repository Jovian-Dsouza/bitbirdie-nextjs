import { Base } from "../base";

export class Posts extends Base {
  authenticate(idToken: string, callback: (result: any, error: any) => void) {
    this.request(`/authenticate`, {
      method: "POST",
      body: JSON.stringify({ id_token: idToken }),
    })
      .then((result: any) => {
        // Call front end for setting pin
        // result -> status, data: {auth_token, message, refresh_auth_token, device_token}
        if (result.status === "success") {
          this.authToken = result.data.auth_token;
          console.log("token", this.authToken);
        }
        callback(result, null);
      })
      .catch((error) => {
        callback(null, error);
      });
  }

  getUserDetails(callback: (result: any, error: any) => void) {
    if (!this.authToken) {
      callback(null, Error("Not authenticated"));
    }
    this.request("/user_from_token")
      .then((result: any) => {
        callback(result, null);
      })
      .catch((error) => {
        callback(null, error);
      });
  }

  getWallets(callback: (result: any, error: any) => void) {
    if (!this.authToken) {
      callback(null, Error("Not authenticated"));
    }
    this.request("/wallet", {
      method: "POST",
    })
      .then((result: any) => {
        callback(result, null);
      })
      .catch((error) => {
        callback(null, error);
      });
  }

  getPortfolio(callback: (result: any, error: any) => void) {
    if (!this.authToken) {
      callback(null, Error("Not authenticated"));
    }
    this.request("/portfolio")
      .then((result: any) => {
        callback(result, null);
      })
      .catch((error) => {
        callback(null, error);
      });
  }

  getSupportedNetworks(callback: (result: any, error: any) => void) {
    if (!this.authToken) {
      callback(null, Error("Not authenticated"));
    }
    this.request("/supported/networks")
      .then((result: any) => {
        callback(result, null);
      })
      .catch((error) => {
        callback(null, error);
      });
  }

  getSupportedTokens(callback: (result: any, error: any) => void) {
    if (!this.authToken) {
      callback(null, Error("Not authenticated"));
    }
    this.request("/supported/tokens")
      .then((result: any) => {
        callback(result, null);
      })
      .catch((error) => {
        callback(null, error);
      });
  }

  transferFunds(
    networkName: String,
    tokenAddress: String,
    recipientAddress: String,
    quantity: String,
    callback: (result: any, error: any) => void
  ) {
    if (!this.authToken) {
      callback(null, Error("Not authenticated"));
    }
    this.request("/transfer/tokens/execute", {
      method: "POST",
      body: JSON.stringify({ 
        network_name: networkName,
        token_addresss: tokenAddress,
        quantity,
        recipient_address: recipientAddress
       }),
    })
      .then((result: any) => {
        callback(result, null);
      })
      .catch((error) => {
        callback(null, error);
      });
  }
}
