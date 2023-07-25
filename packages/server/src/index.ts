import path from "path";
import url from "url";

import { UserNetworkingServer } from "@mml-io/3d-web-user-networking";
import cors from "cors";
import express from "express";
import enableWs from "express-ws";

import { ReactMMLDocumentServer } from "./router/ReactMMLDocumentServer";
import { addWebAppRoutes } from "./router/web-app-routes";

const dirname = url.fileURLToPath(new URL(".", import.meta.url));
const PORT = process.env.PORT || 8080;
const MML_DOCUMENT_PATH = path.join(
  dirname,
  "../../mml-document/build/index.js"
);

const { app } = enableWs(express());
app.enable("trust proxy");

const mmlDocumentServer = new ReactMMLDocumentServer(MML_DOCUMENT_PATH);

// Handle playground document sockets
app.ws("/mml-document", (ws) => {
  mmlDocumentServer.handle(ws);
});

// Serve assets with CORS allowing all origins
app.use(
  "/assets/",
  cors(),
  express.static(path.resolve(dirname, "../assets/"))
);

const userNetworkingServer = new UserNetworkingServer();
app.ws("/network", (ws) => {
  userNetworkingServer.connectClient(ws);
});

// Serve the app (including development mode)
addWebAppRoutes(app);

// Start listening
console.log("Listening on port", PORT);
app.listen(PORT);
