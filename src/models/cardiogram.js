/**
 * Cardiogram model
 */
export default class Cardiogram {
  constructor(cardiogram) {
    const card = cardiogram.cards[0];
    this.title = cardiogram.name;
    this.data = card.song.lines.heartRate._line;
    this.start = cardiogram.start;
    this.end = cardiogram.end;
    this.averageBpm = card.stats.averageBpm;
  }
}
