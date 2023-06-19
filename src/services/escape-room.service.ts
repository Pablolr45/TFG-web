import { Service } from "./Service";

export class EscapeRoomService extends Service {
  getAll() {
    return this.get("escape-rooms");
  }

  getById(id: string) {
    return this.get(`escape-rooms/${id}`);
  }

  create(body) {
    return this.post("escape-rooms", body);
  }

  update(id: string, body) {
    return this.post(`escape-rooms/${id}`, body);
  }

  delete(id: string) {
    return this._delete(`escape-rooms/${id}`, {});
  }


}
