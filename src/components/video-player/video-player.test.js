import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import VideoPlayer from './video-player';

const renderIgnoringUnstableFlushDiscreteUpdates = (component) => {
  // tslint:disable: no-console
  const originalError = console.error;
  const error = jest.fn();
  console.error = error;
  const result = render(component);
  expect(error).toHaveBeenCalledTimes(1);
  expect(error).toHaveBeenCalledWith(
  'Warning: unstable_flushDiscreteUpdates: Cannot flush updates when React is already rendering.%s',
  expect.any(String),
  );
  console.error = originalError;
  // tslint:enable: no-console
  return result;
  };
let history; let pauseStub; let playStub;
const fakeFilm = {
  id: `1`,
  title: `The Grand Budapest Hotel`,
  image: ``,
  poster: ``,
  backgroundImage: ``,
  backgroundColor: `blue`,
  genre: `Drama`,
  year: 2014,
  video: ``,
  promoVideo: ``,
  description: `Non non sunt Lorem quis sit voluptate commodo aliqua ut.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`],
  duration: 120,
  rating: 7.5,
  reviewsCount: 3,
  isFavorite: false,
};

describe(`Test for VideoPlayer`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    jest.clearAllMocks();
    pauseStub = jest
      .spyOn(window.HTMLMediaElement.prototype, `pause`)
      .mockImplementation(() => {});
    playStub = jest
      .spyOn(window.HTMLMediaElement.prototype, `play`)
      .mockImplementation(() => {});
  });

  it(`VideoPlayer should render correctly with paused video`, () => {
    render(
        <Router history={history}>
          <VideoPlayer
            image={fakeFilm.poster}
            video={fakeFilm.video}
            isMuted={false}
            isPreview={true}
            isPlaying={false}
            onDurationChange={jest.fn()}
            onTimeUpdate={jest.fn()}
          />
        </Router>
    );

    expect(pauseStub).toHaveBeenCalled();
  });
  it(`VideoPlayer should render correctly with playing video and video must be not muted`, () => {
    const {container} = render(
        <Router history={history}>
          <VideoPlayer
            image={fakeFilm.poster}
            video={fakeFilm.video}
            isMuted={false}
            isPreview={true}
            isPlaying={true}
          />
        </Router>
    );

    expect(playStub).toHaveBeenCalled();
    const video = container.querySelector(`video`);
    expect(video.muted).toBe(false);
  });
});
