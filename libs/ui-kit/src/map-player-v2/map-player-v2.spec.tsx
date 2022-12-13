import { render } from '@testing-library/react';

import MapPlayerV2 from './map-player-v2';

describe('MapPlayerV2', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MapPlayerV2 />);
    expect(baseElement).toBeTruthy();
  });
});
