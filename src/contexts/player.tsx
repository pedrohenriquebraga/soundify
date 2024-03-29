import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import TrackPlayer from "../services/trackPlayer";
import * as MediaLibrary from "expo-media-library";
import {
  Event,
  RepeatMode,
  State,
  useProgress,
} from "react-native-track-player";
import { IMusicData } from "../@types/interfaces";
import jsmediatags from "jsmediatags";
import Storage from "@react-native-async-storage/async-storage";
import { encode } from "base64-arraybuffer";

interface IPlayerContext {
  allMusics: IMusicData[];
  currentMusic: ICurrentMusic;
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
  artist: string;
  index: number;
  duration: number;
  cover?: string;
}

type cachedCovers = {
  [key: string]: string;
};

const PlayerContext = createContext<IPlayerContext>({} as IPlayerContext);

const PlayerProvider: React.FC<{ children: any }> = ({ children }) => {
  const [allMusics, setAllMusics] = useState<IMusicData[]>([]);
  const [currentMusic, setCurrentMusic] = useState<ICurrentMusic>();
  const [hasMoreMusics, setHasMoreMusics] = useState(true);
  const [nextMusicPage, setNextMusicPage] = useState("");
  const [fetchingMusics, setFetchingMusics] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooped, setIsLooped] = useState(false);

  const { position, duration } = useProgress(1500);

  useEffect(() => {
    (async () => {
      await getMoreMusics()
    })();
  }, []);

  useEffect(() => {
    (async () => {
      TrackPlayer.addEventListener(
        Event.PlaybackMetadataReceived,
        async (data) => {
          const currentTrack = await TrackPlayer.getCurrentTrack();

          if (currentMusic && currentTrack === currentMusic.index) return;
          
	  const track = await TrackPlayer.getTrack(currentTrack);

          setCurrentMusic((old) => ({
            name: data.title,
            artist: track.artist,
            index: currentTrack,
            duration: duration,
            cover:
              typeof track.artwork === "string" ? track.artwork : undefined,
          }));
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

  const processAssetMusic = async (
    music: MediaLibrary.Asset,
    index: number
  ) => {
    const { title, artist, cover } = await new Promise<{
      title: string;
      artist: string;
      cover: string;
    }>((resolve) => {
      new jsmediatags.Reader(music.uri.replace("file:///", "/"))
        .setTagsToRead(["title", "artist", "picture"])
        .read({
          async onSuccess(data) {
            let coverPath = "";

            if (data.tags.picture.format) {

              const cachedCover = await Storage.getItem(music.filename);
              // @ts-ignore
              coverPath = `data:${data.tags.picture.format};base64,${encode(data.tags.picture.data)}`;
            }

            resolve({
              artist: data.tags.artist,
              title: data.tags.title,
              cover: coverPath,
            });
          },
          onError(error) {
            console.warn(error);

            resolve({
              title: "",
              artist: "",
              cover: "",
            });
          },
        });
    });

    const processedMusic = {
      index,
      name: title,
      artist,
      path: music.uri,
      duration: music.duration,
      albumId: music.albumId,
      contentType: music.mediaType,
      date: music.creationTime,
      cover,
    };

    return processedMusic;
  };

  const getMusicAssets = async () => {
    const { assets, endCursor, hasNextPage } =
      await MediaLibrary.getAssetsAsync({
        first: 4,
        mediaType: "audio",
        after: nextMusicPage || undefined,
        sortBy: "default",
      });

    setHasMoreMusics(hasNextPage);
    setNextMusicPage(endCursor);

    return assets;
  };

  const getMoreMusics = async () => {
    if (!hasMoreMusics || fetchingMusics) return;

    setFetchingMusics(true);
    const assets = await getMusicAssets();
    const queueSize = allMusics.length;
    const newMusics = await Promise.all(
      assets.map(
        async (a, index) => await processAssetMusic(a, index + queueSize)
      )
    );

    TrackPlayer.add(
      newMusics.map((music) => {
        return {
          title: music.name,
          album: music.albumId,
          artist: music.artist,
          url: music.path,
          duration: music.duration,
          contentType: music.contentType,
          artwork: music.cover || require("../assets/artwork.png"),
        };
      })
    );

    setAllMusics((old) => [...old, ...newMusics]);
    setFetchingMusics(false);
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
    await TrackPlayer.skip(trackIndex);
    await TrackPlayer.play();
  };

  const handleSeek = async (position: number) => {
    await TrackPlayer.seekTo(position);
  };

  return (
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
        isPlaying,
        isMuted,
        isLooped,
        fetchingMusics,
        hasMoreMusics,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayer = () => useContext(PlayerContext);

export { PlayerProvider, usePlayer };
