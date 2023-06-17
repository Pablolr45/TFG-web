import { Service } from "./Service";

export class EscapeRoomService extends Service {
  getAll() {
    return this.get("escape-rooms");
  }

  getById(id: string){
    return this.get(`escape-rooms/${id}`)
  }
}
