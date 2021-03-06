import { Injectable } from "@nestjs/common";
import { catchError, combineLatest, from, mapTo, Observable, of } from "rxjs";
import { Connection, Repository } from "typeorm/index";
import { MapEntity } from "../entites/mapEntity";
import { ErrorsService } from "../../settings/services/errors-service";
import { MapsSearch, OrderDirection } from "../interfaces/maps-search";
import { OrderField } from "../interfaces/map";

@Injectable()
export class MapsService {
    private repository: Repository<MapEntity>;

    constructor(
        connection: Connection,
        private errorsService: ErrorsService,
    ) {
        this.repository = connection.getRepository(MapEntity);
    }

    getByIds(ids: string[]): Observable<MapEntity[]> {
        return from(this.repository.findByIds(ids));
    }

    saveList(list: MapEntity[]): Observable<MapEntity[]> {
        return combineLatest(
            list.map(item => from(this.repository.save(item)).pipe(
                catchError(error => {
                    this.errorsService.addError(error, item);

                    return of(null);
                }),
            )),
        ).pipe(
            mapTo(list),
        );
    }

    loadList(query: MapsSearch, maxLimit = 100): Promise<MapEntity[]> {
        const queryRunner = this.repository.createQueryBuilder('maps');
        const limit = Math.min(query.limit, maxLimit);
        queryRunner.limit(limit);
        queryRunner.offset(query.offset || 0);
        queryRunner.orderBy('id');

        if (query.search) {
            queryRunner.andWhere('(maps.name like :search ' +
                'or maps.description like :search ' +
                'or maps.songName like :search' +
                ')', {
                search: '%' + query.search + '%',
            });
        }

        if (query.tagsPositive) {
            const ids = JSON.parse(query.tagsPositive).map(it => +it);
            if (ids.length) {
                queryRunner.andWhere(
                    '('
                    + ids.map(tag => `JSON_CONTAINS(maps.tags, "${tag}")` ).join(' AND ')
                    + ')'
                );
            }
        }

        if (query.tagsNegative) {
            const ids = JSON.parse(query.tagsNegative).map(it => +it);
            if (ids.length) {
                queryRunner.andWhere(
                    '('
                    + ids.map(tag => `not JSON_CONTAINS(maps.tags, "${tag}")` ).join(' AND ')
                    + ')',
                );
            }
        }

        if (query.npsFrom) {
            queryRunner.andWhere('maps.maxNps >= :npsFrom', {
                npsFrom: query.npsFrom,
            });
        }

        if (query.npsTo) {
            queryRunner.andWhere('maps.minNps <= :npsTo', {
                npsTo: query.npsTo,
            });
        }

        if (query.dateFrom) {
            queryRunner.andWhere('DATE(maps.createdAt) >= :dateFrom', {
                dateFrom: query.dateFrom,
            });
        }

        const orderFiled = OrderField[query.orderField] || OrderField.createdAt;
        const orderDirection = OrderDirection[query.orderDirection] || OrderDirection.desc;

        queryRunner.orderBy(orderFiled, orderDirection);

        return queryRunner.getMany();
    }
}
