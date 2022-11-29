import styles from './stars.module.scss';

export interface StarsProps {
  stars: number;
}

export function Stars(props: StarsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Stars!</h1>
    </div>
  );
}

export default Stars;
