import TrackPlayer from "react-native-track-player";
import { IMusicData, IProcessedMusic } from "../@types/interfaces";
import * as MediaLibrary from "expo-media-library";
import jsmediatags from "jsmediatags";

const MAX_MUSICS_PER_REQUEST = 20;

export const processAssetMusic = async (
  music: MediaLibrary.Asset,
  index: number
) => {
  const { title, artist, cover, year } = await new Promise<{
    title: string;
    artist: string;
    cover: string;
    year: string;
  }>((resolve) => {
    new jsmediatags.Reader(music.uri.replace("file:///", "/"))
      .setTagsToRead(["title", "artist", "year"])
      .read({
        async onSuccess(data) {
          let coverPath = "";

          resolve({
            artist: data.tags.artist,
            title: data.tags.title,
            year: data.tags.year,
            cover: coverPath,
          });
        },
        onError(error) {
          console.warn(error);

          resolve({
            title: "",
            artist: "",
            cover: "",
            year: "",
          });
        },
      });
  });

  const processedMusic = {
    index,
    name: title || "> Música sem nome",
    artist: artist || "Desconhecido",
    path: music.uri,
    duration: music.duration,
    albumId: music.albumId,
    contentType: music.mediaType,
    date: music.creationTime,
    year,
    cover,
  };

  return processedMusic as IProcessedMusic;
};

export const contructObjectForTrackPlayer = (music: IProcessedMusic) => {
  return {
    title: music.name,
    artist: music.artist,
    album: music.albumId,
    url: music.path,
    duration: music.duration,
    contentType: music.contentType,
    artwork: music.cover || require("../assets/artwork.png"),
  };
}

export const getMusicAssets = async (nextMusicPage: MediaLibrary.AssetRef = undefined) => {
  const { assets, endCursor, hasNextPage } =
    await MediaLibrary.getAssetsAsync({
      first: MAX_MUSICS_PER_REQUEST,
      mediaType: "audio",
      after: nextMusicPage,
    })

  return {assets, endCursor, hasNextPage};
};

export const reorganizeTracks = async (trackList: IMusicData[]) => {
  // TrackPlayer.
}