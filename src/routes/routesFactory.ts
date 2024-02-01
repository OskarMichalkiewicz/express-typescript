import { Router, RequestHandler } from "express";
export const routesFactory = (
  router: Router,
  {
    get,
    getOne,
    create,
    modify,
    remove,
  }: {
    get?: RequestHandler;
    getOne?: RequestHandler;
    create?: RequestHandler;
    modify?: RequestHandler;
    remove?: RequestHandler;
  }
) => {
  if (get) router.get("/", get);

  if (getOne) router.get("/:id", getOne);

  if (create) router.post("/", create);

  if (modify) router.put("/:id", modify);

  if (remove) router.delete("/:id", remove);

  return router;
};
