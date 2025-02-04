import styles from './resources.module.scss';
import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { RES_LIST } from '../../conts/res-list';


/* eslint-disable-next-line */
export interface ResourcesProps {}

export function Resources(props: ResourcesProps) {
  return (
    <div className={styles['container']}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Img</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {RES_LIST.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell classes={{root : styles.celImage}}>
                  <img src={row.img} className={styles.resImage} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Resources;
