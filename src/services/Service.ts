export class Service {
  URL: string | undefined = process.env.NEXT_PUBLIC_API;

  get(url: string) {
    return fetch(this.URL + url);
  }
  post(url: string, body) {
    return fetch(this.URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
}
