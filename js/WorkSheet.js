import { Connection } from "./Connection.js";

class WorkSheet {
  pubsub = null;
  blocks = [];
  connections = [];

  setPubSub(pubsub) {
    this.pubsub = pubsub;
  }

  addBlock(block) {
    this.blocks.push(block);
    this.pubsub.publish("blockAdded", [block]);
  }

  connect(terminal1, terminal2) {
    const connection = new Connection(terminal1, terminal2);
    this.connections.push(connection);
    this.pubsub.publish("terminalConnected", [connection]);
  }
}

export { WorkSheet };
