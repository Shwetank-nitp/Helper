class Service {
  url = String(import.meta.env.URL);
  router;
  constructor(router) {
    if (!this.url) {
      throw new Error("env is not preset");
    }
    this.router = router + "/";
    this.url = this.url + this.router;
  }
}
export { Service };
