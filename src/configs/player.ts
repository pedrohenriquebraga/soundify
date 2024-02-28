import TrackPlayer, {
  UpdateOptions,
} from "react-native-track-player";
import { AppKilledPlaybackBehavior, Capability } from "react-native-track-player/lib/constants";

const capabilities = [
  Capability.Play,
  Capability.Pause,
  Capability.SkipToNext,
  Capability.SkipToPrevious,
  Capability.SeekTo,
];

export const updateConfigs: UpdateOptions = {
  android: {
    alwaysPauseOnInterruption: true,
    appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
  },
  icon: require("../assets/icon.png"),
  playIcon: require("../assets/play-icon.png"),
  pauseIcon: require("../assets/pause-icon.png"),
  previousIcon: require("../assets/skip-prev-icon.png"),
  nextIcon: require("../assets/skip-next-icon.png"),
  capabilities,
  compactCapabilities: capabilities,
  notificationCapabilities: capabilities,
};
