import styles from './tags.module.scss';
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { FilterState } from "../../../store/filter/store";
import { FilterKey } from "@bsab/api/request/request";
import { filterService } from "../../../services/filter.service";
import cloneDeep from 'lodash/cloneDeep';
import { TAGS } from "@bsab/ui-kit/filter/models/tags";

export interface TagsProps {
  tags: number[];
  className?: string;
}

export function Tags({ tags, className,  }: TagsProps) {
  const tagsMeta = TAGS;

  const filter = useSelector<RootState, FilterState>((state) => state.filter);

  const getLink = (id: number) => {
    const state = cloneDeep(filter);
    state.values.push({ key: FilterKey.tags, value: id.toString() })

    return filterService.buildQuery(state);
  }

  return (
    <span className={styles.tags + ' ' + className} >
      { tags.map(id => tagsMeta.find(it => it.id === id)).filter(it => !!it).map(tag =>
        <a key={tag!.id} className={styles.tag} href={ getLink(tag!.id) } target='_blank'>{ tag!.name }</a>
      )}
    </span>
  );
}

export default Tags;
