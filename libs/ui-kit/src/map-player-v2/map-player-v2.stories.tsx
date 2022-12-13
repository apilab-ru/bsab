import { Story, Meta } from '@storybook/react';
import { MapPlayerV2, MapPlayerProps } from './map-player-v2';

export default {
  component: MapPlayerV2,
  title: 'MapPlayerV2',
} as Meta;

/*const mapId = '15e8';
const apiUrl = 'https://localhost:3000/maps/';
const mapSource = fetch(apiUrl + mapId).then(res => res.json())*/

const sourceUrl = `https://localhost:3000/parser/proxy-file?file=F:\\\\beat-saber-files\\\\15e8\\\\zip.zip`;

const Template: Story<MapPlayerProps> = (args) => <MapPlayerV2 {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  sourceUrl,
  duration: 89
};
