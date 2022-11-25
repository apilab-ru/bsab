import styles from './profile.module.scss';
import Header from '../Header/Header';
import React from 'react';
import { mapsApiService } from '../../services/maps-api-service';

export function Profile() {
  const idsRef = React.createRef<HTMLTextAreaElement>();

  const importShowedItems = () => {
    const ids = JSON.parse(idsRef.current!.value);
    mapsApiService.markAsShowedList(ids).then(() => alert('Success'));
    console.log(ids);
  }

  return (
    <div>
      <Header></Header>

      <textarea ref={idsRef}></textarea>
      <button onClick={importShowedItems}>Import showed items</button>
    </div>
  );
}

export default Profile;
