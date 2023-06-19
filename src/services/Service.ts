import Cookies from "js-cookie";

export class Service {
  URL: string | undefined = process.env.NEXT_PUBLIC_API;

  get(url: string) {
    return fetch(this.URL + url, {
      headers: {
        authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    });
  }

  post(url: string, body) {
    return fetch(this.URL + url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  _delete(url: string, body) {
    return fetch(this.URL + url, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
}
