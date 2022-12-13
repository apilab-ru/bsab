import styles from './map-player-v2.module.scss';
import { MapParserService } from "./map-parser.service";
import React, { useEffect, useState } from "react";
import { MapSourceData } from "./interface";
import { SceneService } from "./scene.service";
import { MapPlayerService } from "./map-player.service";

const mapParserService = new MapParserService();
const sceneService = new SceneService();
const mapPlayerService = new MapPlayerService(sceneService);

export interface MapPlayerProps {
  sourceUrl: string;
  duration: number;
}

export function MapPlayerV2({ sourceUrl, duration }: MapPlayerProps) {
  const [sourceData, setSourceData] = useState<MapSourceData | null>(null);
  const sceneRef = React.createRef<HTMLDivElement>();
  const audioElementRef = React.createRef<HTMLAudioElement>();

  useEffect(() => {
    mapParserService.fetchData(sourceUrl, duration).then(data => {
      setSourceData(data);
      console.log('xxx data', data);
    })
  }, [sourceUrl, duration]);

  useEffect(() => {
    if (sourceData) {
      mapPlayerService.setData(sourceData);
    }
  }, [sourceData])

  useEffect(() => {
    sceneService.setContainer(sceneRef.current!);

    return () => {
      console.log('xxx destroy');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = audioElementRef.current?.currentTime || 0;
      mapPlayerService.setTime(time);
    }, 30);

    return () => {
      clearInterval(interval);
    }
  }, [audioElementRef]);

  return (
    <div className={ styles.container }>
      <div className={ styles.canvas } ref={ sceneRef }></div>
      <audio className={ styles.player } controls src={ sourceData?.song } ref={ audioElementRef }/>
    </div>
  );
}

export default MapPlayerV2;
