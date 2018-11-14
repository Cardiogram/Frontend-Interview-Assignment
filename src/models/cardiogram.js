/**
 * Cardiogram model
 */
export default class Cardiogram {
  constructor(cardiogram) {
    const [card] = cardiogram.cards;
    this.title = cardiogram.name;
    this.data = card.song.lines.heartRate._line;
    this.start = cardiogram.start;
    this.end = cardiogram.end;
    this.uuid = cardiogram.uuid || this.title;
    this.internalSegments = card.song.internalSegments || [];
  }
}
