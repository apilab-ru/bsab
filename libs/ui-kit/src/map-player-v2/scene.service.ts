import {
   MeshBasicMaterial,
   Mesh,
   PerspectiveCamera,
   Scene as ThreeScene,
   WebGLRenderer,
   Color,
   BoxGeometry,
   DirectionalLight,
   AmbientLight,
   MeshLambertMaterial,
   TextureLoader,
   AddOperation,
   DoubleSide,
   MeshPhongMaterial,
} from 'three';
import { Renderer } from "three/src/renderers/WebGLRenderer";
import { Scene } from "three/src/scenes/Scene";
import { Camera } from "three/src/cameras/Camera";
import { MapLineCell, MapLineRow } from "@bsab/api/map/difficulty";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";

const LINE_MAP_CELL: Record<MapLineCell, number> = {
   0: -0.3,
   1: -0.1,
   2: 0.1,
   3: 0.3,
};

const LINE_MAP_ROW: Record<MapLineRow, number> = {
   0: -0.3,
   1: 0,
   2: 0.3,
};
const triangle = require('./images/triangle.png');

export class SceneService {
   private container: HTMLElement;
   private renderer: Renderer;
   private scene: Scene;
   private camera: Camera;
   private sceneSizes: { width: number, height: number };

   setContainer(container: HTMLElement): void {
      this.container = container;
      const { width, height } = container.getBoundingClientRect();

      this.sceneSizes = { width, height };
      this.initRenderer(container, width, height);
      this.initScene();
      this.initCamera();

      this.render();
   }

   clearScene(): void {
      this.scene.clear();
   }

   render(): void {
      this.renderer.render(this.scene, this.camera);
   }

   moveCamera(z: number): void {
      this.camera.position.z = z;
      this.render();
   }

   renderNote(z: number, color: number, ceil: MapLineCell, row: MapLineRow): void {
      const geometry = new RoundedBoxGeometry(0.1, 0.1, 0.1, 1, 0.01);

      const baseMaterial = new MeshBasicMaterial({
         color,
         side: DoubleSide,
      });
      const faceMaterial = new MeshBasicMaterial({
         map: new TextureLoader().load(triangle),
         color: 'white',
         transparent: true,
      });

      const materials = [
         baseMaterial,
         baseMaterial,
         baseMaterial,
         baseMaterial,
         faceMaterial,
         baseMaterial,
      ];

      const cube = new Mesh(geometry, materials)
      cube.position.z = z;
      cube.rotation.x = 0.1;
      cube.position.x = LINE_MAP_CELL[ceil];
      cube.position.y = LINE_MAP_ROW[row];
      this.scene.add(cube)
   }

   private initCamera(): void {
      const { width, height } = this.sceneSizes;
      this.camera = new PerspectiveCamera(20, width / height, 1, 100);
      this.camera.position.z = 0;
   }

   private initScene(): void {
      // Создаём объект сцены
      this.scene = new ThreeScene();

      // Задаём цвет фона
      this.scene.background = new Color("black");

      const light = new DirectionalLight(0xffffff, 1);
      light.position.setScalar(10);
      this.scene.add(light);
      this.scene.add(new AmbientLight(0xffffff, 0.5));
   }

   private initRenderer(canvasContainer: HTMLElement, width: number, height: number): void {
      // Создаём редерер (по умолчанию будет использован WebGL2)
      // antialias отвечает за сглаживание объектов
      this.renderer = new WebGLRenderer({ antialias: true });

      this.renderer.setSize(width, height);

      //Добавляем рендерер в узел-контейнер, который мы прокинули извне
      canvasContainer.appendChild(this.renderer.domElement);
   }

}
