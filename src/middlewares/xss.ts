import { RequestHandler } from "express";
import { inHTMLData } from "xss-filters";

function clean(data: string | object = "") {
  let isObject = false;
  if (typeof data === "object") {
    data = JSON.stringify(data);
    isObject = true;
  }

  data = inHTMLData(data).trim();
  if (isObject) data = JSON.parse(data);

  return data;
}

function xss(): RequestHandler<{}, {}, {}, {}> {
  return (req, res, next) => {
    if (req.body) req.body = clean(req.body);
    if (req.query) req.query = clean(req.query);
    if (req.params) req.params = clean(req.params);

    next();
  };
}
export default xss;
