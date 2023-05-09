import styles from './cinema.module.scss';
import { MapCinema } from "@bsab/api/map/map";
import { MouseEvent } from "react";

export interface CinemaProps {
  cinema: MapCinema | undefined;
  click: () => void;
}

export function Cinema({ cinema, click }: CinemaProps) {
  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    click();
  }

  return (
    <div className={styles.cinema} onClick={ handleClick }>
      Cinema:
      { !!cinema &&
        <span className={styles.item}>have</span>
      }
      { cinema?.videoFile &&
        <span className={styles.item}>with file</span>
      }
      { !cinema &&
        <span className={styles.item + ' ' + styles.not }>haven't</span>
      }
    </div>
  );
}

export default Cinema;
