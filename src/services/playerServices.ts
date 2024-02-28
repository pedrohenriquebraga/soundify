import { Event } from "react-native-track-player/lib/constants";
import TrackPlayer from "../services/trackPlayer"
import { setUserPaused, userPaused } from ".";

module.exports = async function () {

  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    await TrackPlayer.play();
    setUserPaused(false);
  });
  TrackPlayer.addEventListener(Event.RemotePause, async () => {
    await TrackPlayer.pause()
    setUserPaused(true);
  });
  TrackPlayer.addEventListener(Event.RemoteNext, async () => {
    
    const currentTrack = await TrackPlayer.getCurrentTrack();
    const queueLength = (await TrackPlayer.getQueue()).length
    
    if (currentTrack + 1 >= queueLength) {
      await TrackPlayer.skip(0);
      return;
    }

    await TrackPlayer.skipToNext();
    await TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
    const queueLength = (await TrackPlayer.getQueue()).length
    const currentTrack = await TrackPlayer.getCurrentTrack();
    const positionTrack = await TrackPlayer.getPosition()

    if (positionTrack >= 3) {
      await TrackPlayer.seekTo(0)
      return
    } 

    if (currentTrack - 1 < 0) {
      await TrackPlayer.skip(queueLength - 1);
      return;
    }

    await TrackPlayer.skipToPrevious();
    await TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemoteSeek, data => TrackPlayer.seekTo(data.position))
  TrackPlayer.addEventListener(Event.RemoteDuck, async data => {
    const { paused, permanent } = data;

    if (paused) {
      await TrackPlayer.pause()
    } else if (!paused && !permanent && !userPaused) {
      await TrackPlayer.play()
    }
  })
};
