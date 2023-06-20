import TrackPlayer from "react-native-track-player";
import * as configs from "../configs/player";

TrackPlayer.setupPlayer({
  autoUpdateMetadata: true,
});
TrackPlayer.updateOptions(configs.updateConfigs);

export default TrackPlayer;
