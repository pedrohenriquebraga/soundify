import React, { createContext, useContext, useEffect, useState } from "react";
import TrackPlayer from "../services/trackPlayer";
import { useProgress, useIsPlaying } from "react-native-track-player";
import { IMusicData } from "../@types/interfaces";
import _ from "lodash";
import {
  Event,
  RepeatMode,
  State,
} from "react-native-track-player/lib/constants";
import {
  contructObjectForTrackPlayer,
  getMusicAssets,
  processAssetMusic,
} from "../utils/music";
import { setUserPaused } from "../services";

interface IPlayerContext {
  allMusics: IMusicData[];
  currentMusic: ICurrentMusic;
  hasMoreMusics: boolean;
  fetchingMusics: boolean;
  isLooped: boolean;
  isMuted: boolean;
  hasPermission: boolean;
  getMoreMusics: () => void;
  useProgress: typeof useProgress;
  playAndPauseMusic: () => void;
  handlePrevMusic: () => void;
  handleNextMusic: () => void;
  handleMute: () => void;
  handleLoop: () => void;
  handleSeek: (position: number) => void;
  handleSelectMusic: (trackIndex: number) => void;
  setHasPermission: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ICurrentMusic {
  name: string;
  artist: string;
  index: number;
  duration: number;
  cover?: string;
}

const PlayerContext = createContext<IPlayerContext>({} as IPlayerContext);
const PlayerProvider: React.FC<{ children: any }> = ({ children }) => {
  const [allMusics, setAllMusics] = useState<IMusicData[]>([]);
  const [currentMusic, setCurrentMusic] = useState<ICurrentMusic>();
  const [hasMoreMusics, setHasMoreMusics] = useState(true);
  const [nextMusicPage, setNextMusicPage] = useState(undefined);
  const [fetchingMusics, setFetchingMusics] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooped, setIsLooped] = useState(false);

  const [hasPermission, setHasPermission] = useState(false);

  const { position, duration } = useProgress(1500);
  const { playing } = useIsPlaying();

  const getMoreMusics = async () => {
    if (!hasMoreMusics || fetchingMusics) return;

    setFetchingMusics(true);
    const { assets, endCursor, hasNextPage } = await getMusicAssets(
      nextMusicPage
    );

    setHasMoreMusics(hasNextPage);
    setNextMusicPage(endCursor);

    const queueSize = allMusics.length;
    const newMusics = await Promise.all(
      assets.map(
        async (a, index) => await processAssetMusic(a, index + queueSize)
      )
    );

    await TrackPlayer.add(newMusics.map(contructObjectForTrackPlayer));

    setAllMusics((old) => [...old, ...newMusics]);
    setFetchingMusics(false);
  };

  const playAndPauseMusic = async () => {
    if (playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const handlePrevMusic = async () => {
    if (currentMusic && position >= 3) {
      await TrackPlayer.seekTo(0);
      return;
    }

    if (currentMusic.index - 1 < 0) {
      setCurrentMusic({
        name: allMusics[allMusics.length - 1].name,
        artist: allMusics[allMusics.length - 1].artist,
        index: allMusics.length - 1,
        duration,
        cover: allMusics[allMusics.length - 1].cover,
      });
      await TrackPlayer.skip(allMusics.length - 1);
      return;
    }

    setCurrentMusic((old) => ({
      name: allMusics[old.index - 1].name,
      artist: allMusics[old.index - 1].artist,
      index: old.index - 1,
      duration,
      cover: allMusics[old.index - 1].cover,
    }));
    await TrackPlayer.skipToPrevious();
    await TrackPlayer.play();
  };

  const handleNextMusic = async () => {
    if (currentMusic.index + 1 >= allMusics.length) {
      setCurrentMusic({
        name: allMusics[0].name,
        artist: allMusics[0].artist,
        index: 0,
        duration,
        cover: allMusics[0].cover,
      });
      await TrackPlayer.skip(0);
      return;
    }

    setCurrentMusic((old) => ({
      name: allMusics[old.index + 1].name,
      artist: allMusics[old.index + 1].artist,
      index: old.index + 1,
      duration,
      cover: allMusics[old.index + 1].cover,
    }));
    await TrackPlayer.skipToNext();
    await TrackPlayer.play();
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
    setCurrentMusic((old) => ({
      name: allMusics[trackIndex].name,
      artist: allMusics[trackIndex].artist,
      index: trackIndex,
      duration,
      cover: allMusics[trackIndex].cover,
    }));
    await TrackPlayer.skip(trackIndex, 0);
    await TrackPlayer.play();
  };

  const handleSeek = async (position: number) => {
    await TrackPlayer.seekTo(position);
  };

  useEffect(() => {
    (async () => {
      if (!hasPermission) return;

      setFetchingMusics(true);
      const { assets, endCursor, hasNextPage } = await getMusicAssets();

      setHasMoreMusics(hasNextPage);
      setNextMusicPage(endCursor);

      const musics = await Promise.all(assets.map(processAssetMusic));
      await TrackPlayer.add(musics.map(contructObjectForTrackPlayer));

      setAllMusics(musics);
      setFetchingMusics(false);
    })();
  }, [hasPermission]);

  useEffect(() => {
    TrackPlayer.addEventListener(
      Event.MetadataCommonReceived,
      async (data) => {
        console.log("[Track Player Log] Música trocada");

        const currentTrack = await TrackPlayer.getActiveTrackIndex();

        if (currentMusic && currentTrack === currentMusic.index) return;

        const track = await TrackPlayer.getTrack(currentTrack);

        setCurrentMusic((old) => ({
          index: currentTrack,
          name: data.metadata.title,
          artist: track.artist,
          duration: duration,
          cover: typeof track.artwork === "string" ? track.artwork : undefined,
        }));
      }
    );
  }, []);

  useEffect(() => {
    if (playing) {
      setUserPaused(false);
    } else if (!playing) {
      setUserPaused(true);
    }
  }, [playing]);

  return (
    // @ts-ignore
    <PlayerContext.Provider
      value={{
        allMusics,
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
        isMuted,
        isLooped,
        fetchingMusics,
        hasMoreMusics,
        hasPermission,
        setHasPermission,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayer = () => useContext(PlayerContext);

export { PlayerProvider, usePlayer };
