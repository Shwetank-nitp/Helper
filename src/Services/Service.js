class Service {
  url = String(import.meta.env.VITE_URL);
  router;
  constructor(router) {
    if (!this.url || this.url === "undefined") {
      throw new Error("env is not preset");
    }
    this.router = router + "/";
    this.url = this.url + this.router;
  }
}
export { Service };
