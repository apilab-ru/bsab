import { MapSourceData } from "./interface";
import { SceneService } from "./scene.service";

const SECONDS_IN_MINUTE = 60;

export class MapPlayerService {
   private data: MapSourceData;
   private steps: number;
   private duration: number;
   private env = {
      colors: [0xff0000, 0x3575c9]
   };

   constructor(
      private sceneService: SceneService,
   ) {
   }

   setData(data: MapSourceData): void {
      this.data = data;
      this.steps = Math.ceil(data.duration / SECONDS_IN_MINUTE * data.info.bpm);
      this.duration = data.duration;

      const [diff] = Object.keys(data.diffs);
      this.setDiff(diff);
      this.sceneService.moveCamera(this.steps);
      this.sceneService.render();
   }

   setTime(time: number): void {
      const position = (time / this.duration) * this.steps;
      this.sceneService.moveCamera(this.steps - position);
   }

   setDiff(diff: string): void {
      this.sceneService.clearScene();

      //this.sceneService.renderNote(this.steps - 2, 0xff0000); // красный
      //this.sceneService.renderNote(0, 0x3575c9);
      console.log('xxx steps', this.steps);

      this.data.diffs[diff].notes.forEach(note => {
         this.sceneService.renderNote(this.steps - note.time, this.env.colors[note.type], note.lineCell, note.lineRow);
      })
   }

}
