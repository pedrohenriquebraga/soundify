import TrackPlayer from "react-native-track-player";
import { IMusicData } from "../@types/interfaces";
import * as MediaLibrary from "expo-media-library";
import jsmediatags from "jsmediatags";

const MAX_MUSICS_PER_REQUEST = 30;

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

          // if (data.tags.picture.format) {

          //   const cachedCover = await Storage.getItem(music.filename);
          //   // @ts-ignore
          //   // coverPath = `data:${data.tags.picture.format};base64,${encode(data.tags.picture.data)}`;
          // }

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
    name: title,
    artist,
    path: music.uri,
    duration: music.duration,
    albumId: music.albumId,
    contentType: music.mediaType,
    date: music.creationTime,
    year,
    cover,
  };

  return processedMusic;
};

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
  
}