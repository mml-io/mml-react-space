import {
  EditableNetworkedDOM,
  LocalObservableDOMFactory,
} from "@mml-io/networked-dom-server";
import { watch } from "chokidar";
import fs from "fs";
import url from "url";
import * as ws from "ws";

const getMmlDocumentContent = (documentPath: string) => {
  const contents = fs.readFileSync(documentPath, {
    encoding: "utf8",
    flag: "r",
  });
  return `<m-group id="root"></m-group><script>${contents}</script>`;
};

export class ReactMMLDocumentServer {
  private mmlDocument: EditableNetworkedDOM;

  constructor(private mmlDocumentPath: string) {
    this.mmlDocument = new EditableNetworkedDOM(
      url.pathToFileURL(this.mmlDocumentPath).toString(),
      LocalObservableDOMFactory,
    );

    // Watch for changes in DOM file and reload
    watch(this.mmlDocumentPath).on("change", () => {
      this.reload();
    });
    this.reload();
  }

  public handle(webSocket: ws.WebSocket) {
    this.mmlDocument.addWebSocket(webSocket as unknown as WebSocket);
    webSocket.on("close", () => {
      this.mmlDocument.removeWebSocket(webSocket as unknown as WebSocket);
    });
  }

  private reload() {
    this.mmlDocument.load(getMmlDocumentContent(this.mmlDocumentPath));
  }
}
