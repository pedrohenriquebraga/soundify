import React, { createContext, useContext, useEffect, useState } from "react";
import TrackPlayer from "../services/trackPlayer";
import * as MediaLibrary from "expo-media-library";
import {
  Event,
  RepeatMode,
  State,
  useProgress,
} from "react-native-track-player";
import { usePersistedState } from "../hooks/usePersistedState";
import { IMusicData } from "../@types/interfaces";

interface IPlayerContext {
  allMusics: IMusicData[];
  currentMusic: ICurrentMusic;
  recentListenMusics: IMusicData[];
  hasMoreMusics: boolean;
  fetchingMusics: boolean;
  isPlaying: boolean;
  isLooped: boolean;
  isMuted: boolean;
  getMoreMusics: () => void;
  useProgress: typeof useProgress;
  playAndPauseMusic: () => void;
  handlePrevMusic: () => void;
  handleNextMusic: () => void;
  handleMute: () => void;
  handleLoop: () => void;
  handleSeek: (position: number) => void;
  handleSelectMusic: (trackIndex: number) => void;
}

interface ICurrentMusic {
  name: string;
  index: number;
  duration: number;
}

const PlayerContext = createContext<IPlayerContext>({} as IPlayerContext);

const PlayerProvider: React.FC = ({ children }) => {
  const [allMusics, setAllMusics] = useState<IMusicData[]>([]);
  const [currentMusic, setCurrentMusic] = useState<ICurrentMusic>();
  const [hasMoreMusics, setHasMoreMusics] = useState(true);
  const [nextMusicPage, setNextMusicPage] = useState("");
  const [fetchingMusics, setFetchingMusics] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooped, setIsLooped] = useState(false);
  const [recentListenMusics, setRecentListenMusics] = usePersistedState<
    IMusicData[]
  >("@SoundfyPlayer:recentMusicListen", []);

  const { position, duration } = useProgress(1500);

  useEffect(() => {
    (async () => {
      const assets = await getMusicAssets();
      const musics = assets.map(processAssetMusic);

      await TrackPlayer.add(
        musics.map((music) => {
          return {
            title: music.name,
            album: music.albumId,
            url: music.path,
            duration: music.duration,
            contentType: music.contentType,
            artwork: require("../assets/artwork.png"),
          };
        })
      );

      setAllMusics(musics);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      TrackPlayer.addEventListener(
        Event.PlaybackMetadataReceived,
        async (data) => {
          const currentTrack = await TrackPlayer.getCurrentTrack();

          setCurrentMusic({
            name: data.title,
            index: currentTrack,
            duration,
          });
        }
      );

      TrackPlayer.addEventListener(Event.PlaybackState, async (data) => {
        if (data.state === State.Playing) {
          setIsPlaying(true);
        } else if (data.state === State.Paused) {
          setIsPlaying(false);
        }
      });
    })();
  }, []);

  const processAssetMusic = (music: MediaLibrary.Asset, index: number) => {
    const processedMusic = {
      index,
      name: music.filename,
      path: music.uri,
      duration: music.duration,
      albumId: music.albumId,
      contentType: music.mediaType,
      date: music.creationTime,
    };

    return processedMusic;
  };

  const getMusicAssets = async () => {
    const { assets, endCursor, hasNextPage, totalCount } =
      await MediaLibrary.getAssetsAsync({
        first: 8,
        mediaType: "audio",
        after: nextMusicPage || undefined,
      });

    setHasMoreMusics(hasNextPage);
    setNextMusicPage(endCursor);

    return assets;
  };

  const getMoreMusics = async () => {
    if (!hasMoreMusics || fetchingMusics) return;

    setFetchingMusics(true)
    const assets = await getMusicAssets();
    const queueSize = (await TrackPlayer.getQueue()).length
    const newMusics = assets.map((a, index) =>
      processAssetMusic(a, index + queueSize)
    );

    await TrackPlayer.add(
      newMusics.map((music) => {
        return {
          title: music.name,
          album: music.albumId,
          artist: "Desconhecido",
          url: music.path,
          duration: music.duration,
          contentType: music.contentType,
          artwork: require("../assets/artwork.png"),
        };
      })
    );

    setAllMusics((old) => [...old, ...newMusics]);
    setFetchingMusics(false)
  };

  const addRecentListenMusic = async (music: IMusicData) => {
    const inList = recentListenMusics.find((rlm) => rlm.path === music.path);

    if (inList) {
      setRecentListenMusics((old) =>
        old.sort((a, b) => {
          if (a.path === music.path) {
            return -1;
          } else {
            return 1;
          }
        })
      );

      return;
    }

    if (recentListenMusics.length < 5) {
      setRecentListenMusics((old) => [music, ...old]);
    } else {
      const newRecentListenMusics = recentListenMusics.slice(0, -1);
      setRecentListenMusics([music, ...newRecentListenMusics]);
    }
  };

  const playAndPauseMusic = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      await TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  const handlePrevMusic = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentMusic && position >= 3) {
      await TrackPlayer.seekTo(0);
      return;
    }

    if (currentTrack - 1 < 0) {
      await TrackPlayer.skip(allMusics.length - 1);
      return;
    }

    await TrackPlayer.skipToPrevious();
    await TrackPlayer.play();

    addRecentListenMusic(allMusics[currentTrack - 1]);
  };

  const handleNextMusic = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack + 1 >= allMusics.length) {
      await TrackPlayer.skip(0);
      return;
    }

    await TrackPlayer.skipToNext();
    await TrackPlayer.play();

    addRecentListenMusic(allMusics[currentTrack + 1]);
  };

  const handleMute = async () => {
    await TrackPlayer.setVolume(isMuted ? 1 : 0);
    setIsMuted((old) => !old);
  };

  const handleLoop = async () => {
    await TrackPlayer.setRepeatMode(
      !isLooped ? RepeatMode.Track : RepeatMode.Queue
    );
    setIsLooped((old) => !old);
  };

  const handleSelectMusic = async (trackIndex: number) => {
    await TrackPlayer.skip(trackIndex);
    await TrackPlayer.play();

    const selectedMusic = allMusics[trackIndex];
    addRecentListenMusic(selectedMusic);
  };

  const handleSeek = async (position: number) => {
    await TrackPlayer.seekTo(position);
  };

  return (
    <PlayerContext.Provider
      value={{
        allMusics,
        recentListenMusics,
        playAndPauseMusic,
        handlePrevMusic,
        handleNextMusic,
        handleMute,
        handleLoop,
        handleSeek,
        handleSelectMusic,
        useProgress,
        getMoreMusics,
        currentMusic,
        isPlaying,
        isMuted,
        isLooped,
        fetchingMusics,
        hasMoreMusics
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayer = () => useContext(PlayerContext);

export { PlayerProvider, usePlayer };
