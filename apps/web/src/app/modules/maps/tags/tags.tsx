import styles from './tags.module.scss';
import { TAGS } from '../../../models/tags';
import { prepareUrlParams } from '../../../helpers/url';

export interface TagsProps {
  tags: number[];
  className?: string;
}

export function Tags({ tags, className }: TagsProps) {
  const tagsMeta = TAGS;

  const getLink = (id: number) => '/?' + prepareUrlParams({
    filter: JSON.stringify([{ key: 'tags', value: id+`` }])
  });

  return (
    <span className={styles.tag + ' ' + className} >
      { tags.map(id => tagsMeta.find(it => it.id === id)).filter(it => !!it).map(tag =>
        <a key={tag!.id} className={styles.tag} href={ getLink(tag!.id) } target='_blank'>{ tag!.name }</a>
      )}
    </span>
  );
}

export default Tags;
