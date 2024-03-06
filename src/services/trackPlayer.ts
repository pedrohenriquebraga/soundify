import TrackPlayer, { RepeatMode } from "react-native-track-player";
import * as configs from "../configs/player";

TrackPlayer.setupPlayer({
  autoUpdateMetadata: true,
}).then(() => {
  TrackPlayer.updateOptions(configs.updateConfigs);
  TrackPlayer.setRepeatMode(RepeatMode.Queue)

  console.log("[ Track Player Log ] Player iniciado com sucesso");
  
}).catch(err => {
  console.log("[ Track Player Error ] ", err);
  
})

export default TrackPlayer;
