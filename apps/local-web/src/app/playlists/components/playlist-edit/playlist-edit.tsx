import 'react-image-crop/src/ReactCrop.scss'
import './playlist-edit.scss';
import { Playlist, Song } from "@bsab/api/local/playlist";
import Button from "@mui/material/Button";
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop';
import React from "react";
import { TextField } from "@mui/material";
import { canvasPreview } from "@bsab/api/utils/canvas-preview";
import { LocalMap } from "@bsab/api/map/map";
import { MapListItem } from "@bsab/ui-kit/map-list-item";

interface PlaylistEditProps {
  close: () => void;
  playlist: Playlist | undefined;
  save: (playlist: Playlist) => void;
  maps: LocalMap[];
}

interface SongItem {
  song: Song;
  map: LocalMap;
}

const initialState = {
  id: undefined as string | undefined,
  crop: undefined as Crop | undefined,
  image: undefined as string | undefined,
  playlistTitle: undefined as string | undefined,
  songs: [] as SongItem[],
}

export class PlaylistEdit extends React.Component<PlaylistEditProps> {
  state = initialState;
  imageRef = React.createRef<HTMLImageElement>();

  constructor(public props: PlaylistEditProps) {
    super(props);

    if (props.playlist) {
      this.state = {
        ...initialState,
        ...props.playlist,
        songs: this.getSongs(props.playlist),
      }
    }
  }

  getSongs(playlist: Playlist): SongItem[] {
    return playlist.songs.map(song => ({
      song,
      map: this.getMapData(song.hash)
    })).filter(item => !!item.map) as SongItem[];
  }

  getHostClass = () => 'playlistEdit ' + (this.props.playlist ? '-has-content' : '');

  setCrop = (crop: Crop) => this.setState({ crop });

  updateField = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => this.setState({
    [fieldName]: event.target.value
  });

  uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        this.updateImage(reader.result?.toString() || '')
      )
      reader.readAsDataURL(event.target.files[0])
    }
  }

  updateImage = (image: string) => {
    this.setState({
      image,
    })
  };

  onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    this.setCrop(
      this.centerAspectCrop(width, height)
    )
  }

  replaceImage = () => {
    // @ts-ignore
    canvasPreview(this.imageRef.current!, this.state.crop!).then(image => {
      this.setState({
        image
      });
    })
  }

  save = () => {
    // @ts-ignore
    const { image, playlistTitle }: { image: string, playlistTitle: string } = this.state;
    this.props.save({
      ...this.props.playlist!,
      image,
      playlistTitle
    })
  }

  centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect = 1,
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 100,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    )
  }

  componentDidUpdate(prevProps: PlaylistEditProps, prevState: typeof initialState,) {
    if (this.props.playlist && this.props.playlist?.id !== prevState.id) {
      this.setState({
        ...this.props.playlist,
        songs: this.getSongs(this.props.playlist),
      })
    }
  }

  getMapData(hash: string): LocalMap | undefined {
    return this.props.maps?.find(item => item.hash === hash);
  }

  render() {
    return (
      <div className={ this.getHostClass() }>
        { !!this.props.playlist &&
        <form>
          <div className="line -top">
            <Button onClick={ this.save }>Save</Button>
            <Button onClick={ this.props.close }>Close</Button>
          </div>
          <div className="line -title">
            <TextField
              value={ this.state.playlistTitle }
              onChange={ this.updateField('playlistTitle') }
              label="Name"
              variant="standard"
            />
          </div>

          <div className="line">
            <label className="replace-file">
              <input
                className="replace-file__input"
                type="file"
                onChange={ this.uploadFile }
              />
              <div>Click for replace image</div>
            </label>
            <ReactCrop crop={ this.state.crop } onChange={ this.setCrop } aspect={ 1 }>
              <img
                ref={ this.imageRef }
                src={ this.state.image }
                onLoad={ this.onImageLoad }
              />
            </ReactCrop>
            <div className="image-details">
              <span className="crop-data">
                <span>{ this.state.crop?.width }{ this.state.crop?.unit }</span> x&nbsp;
                <span>{ this.state.crop?.height }{ this.state.crop?.unit }</span>
              </span>
              <Button variant="contained" onClick={ this.replaceImage }>Save image</Button>
            </div>
          </div>

          <div className="line">
            { this.state.songs.map((item, index) =>
              <MapListItem
                key={ 'song-item-' + index }
                item={ item.map }
                click={ () => {} }
              />
            )}
          </div>
        </form>
        }
      </div>
    );
  }
}
