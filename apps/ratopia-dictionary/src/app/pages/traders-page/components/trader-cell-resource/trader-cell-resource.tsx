import styles from './trader-cell-resource.module.scss';

export interface TraderCellResourceProps {
  name: string;
  icon: string;
}

export function TraderCellResource({ name, icon }: TraderCellResourceProps) {
  return (
    <div className={styles.traderResourceCell}>
      <img className={styles.traderResourceCellIcon} src={ icon }/>
      { name }
    </div>
  );
}

export default TraderCellResource;
