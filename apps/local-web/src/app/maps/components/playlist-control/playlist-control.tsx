import styles from './playlist-control.module.scss';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';

export interface PlaylistControlProps {
  onDelete: () => void;
}

export function PlaylistControl(props: PlaylistControlProps) {
  const clickHandler = (event: React.MouseEvent<unknown>) => {
    props.onDelete();
    event.stopPropagation();
  }

  return (
    <div className={ styles.container }>
      <BookmarkRemoveIcon className={ styles.button } onClick={ clickHandler }/>
    </div>
  );
}

export default PlaylistControl;
