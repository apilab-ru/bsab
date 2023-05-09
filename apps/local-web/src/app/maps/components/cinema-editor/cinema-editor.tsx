import styles from './cinema-editor.module.scss';
import { MapCinema } from "@bsab/api/map/map";
import { Button, Dialog } from "@mui/material";
import FileControl from "../file-control/file-control";
import React, { useEffect, useState } from "react";
import { mapsService } from "../../services/maps.service";
import ProgressLoader from "@bsab/ui-kit/progress-loader/progress-loader";

const youTubeLink = 'https://www.youtube.com/watch?v=';
const youTubeSearch = 'https://www.youtube.com/results?search_query=';

export interface CinemaEditorProps {
  cinema: MapCinema | undefined;
  id: string | null;
  isOpened: boolean;
  handleClose: () => void;
}

export function CinemaEditor({ cinema, id, ...props }: CinemaEditorProps) {
  const [isUploadProgress, updateUploadProgress] = useState(false);

  const makeSearchLink = (title: string) => {
    return youTubeSearch + encodeURI(title);
  }

  console.log('xxx cinema', cinema);

  const makeVideoLink = (cinema: MapCinema | undefined, id: string | null) => {
    if (!id || !cinema?.videoFile) {
      return '';
    }

    return 'https://localhost:3333/map/' + id + '/' + cinema.videoFile;
  }

  const fileChangeHandler = (file: File) => {
    updateUploadProgress(true);

    mapsService.uploadCinemaVideo(id!, file).then(cinema => {
      updateUploadProgress(false);
    }).catch(err => {
      console.log('xxx err', err);
      updateUploadProgress(false);
    })
  }

  const unlinkVideoFile = () => {
    updateUploadProgress(true);

    mapsService.updateMapCinema(id!, {
      ...(cinema || {}),
      videoFile: undefined
    }).then(cinema => {
      updateUploadProgress(false);
    }).catch(err => {
      console.log('xxx err', err);
      updateUploadProgress(false);
    })
  }

  return (
    <Dialog onClose={ props.handleClose } open={ props.isOpened } maxWidth={false}>
      <div className={styles.cinemaContainer}>
        <div className={styles.videoDropdown}>
          { cinema?.videoFile ?
            <video className={styles.videoFile} controls onError={unlinkVideoFile}>
              <source src={makeVideoLink(cinema, id)}/>
            </video>
            :
            <div className={styles.videoPlaceholder}>
              <FileControl className={styles.videControlBig} fileChange={fileChangeHandler}>
                Add file
              </FileControl>
            </div>
          }
          { cinema?.videoFile &&
            <div className={styles.videoControls}>
              <span>video controls</span>

              <FileControl className={styles.videoControlsFile}>
                Replace video file
              </FileControl>

              <Button
                className={styles.control}
                color="error"
                onClick={unlinkVideoFile}
              >
                Remove video
              </Button>
            </div>
          }
        </div>
        <div className={styles.details}>
            <pre>
              { decodeURIComponent(id!) }
            </pre>
            { cinema?.videoID &&
              <a href={ youTubeLink + cinema.videoID } target='_blank' className={styles.link}>You tube link</a>
            }
            { cinema?.title &&
              <a href={ makeSearchLink(cinema.title)} target='_blank' className={styles.link}>
                Search by { cinema.title }
              </a>
            }
        </div>
      </div>
      { isUploadProgress &&
        <ProgressLoader className={styles.loader}/>
      }
    </Dialog>
  );
}

export default CinemaEditor;
