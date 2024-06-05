import NotImplementedException from "../notImplementedException.js";

export default class ViewFactory {
  createTable() {
    throw new NotImplementedException(this.createTable.name);
  }
}
