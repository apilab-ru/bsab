import styles from './map-details.module.scss';
import { MapDetail } from '@bsab/api/map/map-detail';
import MapDifficult from '@bsab/ui-kit/map-difficult/map-difficult';
import { format, parseISO } from 'date-fns';
import { formatDuration } from '@bsab/ui-kit/date-utils/duration';
import Tags from '../tags/tags';
import Button from '@mui/material/Button';


export interface MapDetailsProps {
  item: MapDetail;
}

export function MapDetails({ item }: MapDetailsProps) {
  const dateFormat = (date: string) => format(parseISO(date), 'yyyy-MM-dd HH:mm');

  const linkReplaceExp = new RegExp(/(https{0,1}:\/\/([a-z\.]*)[a-zA-z\.\/0-9?\-=]*)/g);

  const prepareDescription = (description: string) => description.replace(
    linkReplaceExp,
    (link, _,  name) => `<a href="${link}" target="_blank">${name}</a>`
  );

  return (
    <div className={styles.mapDetails}>
      <div className={styles.detailLine}>
        <span className={styles.detailName}>Id:</span>
        <span>{ item.id }</span>
      </div>

      <div className={styles.detailLine}>
        <span className={styles.detailName}>Date:</span>
        <span>{ dateFormat(item.createdAt) }</span>
      </div>

      <MapDifficult details={ item.difsDetails } className={styles.detailLine}></MapDifficult>

      <div className={styles.detailLine}>
        <span className={styles.detailName}>BPM / duration:</span>
        <span>{ item.bpm } / { formatDuration(item.duration) }</span>
      </div>

      <div className={styles.detailLine}>
        <div className={styles.detailName}>Description:</div>
        <div
          dangerouslySetInnerHTML={{ __html: prepareDescription(item.description) }}
          className={styles.description}
        ></div>
      </div>

      { !item.tags?.length ? '' :
        <div className={styles.detailLine}>
          <span className={styles.detailName}>Tags:</span>

          <Tags tags={item.tags}></Tags>
        </div>
      }

      <div className={styles.detailLine}>
        <span className={styles.detailName}>Song:</span>
        <span>{ item.songName } { item. songSubName } { item.songAuthorName }</span>
      </div>

      <div className={styles.detailLine}>
        <a className={styles.button} href={'beatsaver://' + item.id}>
          <Button variant="contained">Install</Button>
        </a>
      </div>
    </div>
  );
}

export default MapDetails;
