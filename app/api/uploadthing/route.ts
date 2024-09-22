import { createRouteHandler } from "uploadthing/next";
import { uTrouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: uTrouter,
});
