import { IMusicData, IProcessedMusic } from "../@types/interfaces";
import * as MediaLibrary from "expo-media-library";
import MusicInfo from "../libs/expo-info";
import _ from "lodash";
import { MusicInfoResponse } from "../libs/expo-info/MusicInfo";

const MAX_MUSICS_PER_REQUEST = 10;

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
    //@ts-ignore
    new MusicInfo.getMusicInfoAsync(music.uri, { picture: true }).then(
      (data: MusicInfoResponse) => {
        if (!_.isObjectLike(data)) {
          resolve({
            artist: "",
            title: "",
            year: "",
            cover: "",
          });
          return;
        }

        let coverPath = data && data.picture ? data.picture.pictureData : "";

        resolve({
          artist: data.artist,
          title: data.title,
          year: "",
          cover: coverPath,
        });
      }
    );
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
};

export const getMusicAssets = async (
  nextMusicPage: MediaLibrary.AssetRef = undefined
) => {
  const { assets, endCursor, hasNextPage } = await MediaLibrary.getAssetsAsync({
    first: MAX_MUSICS_PER_REQUEST,
    mediaType: "audio",
    after: nextMusicPage,
  });

  return { assets, endCursor, hasNextPage };
};

export const reorganizeTracks = async (trackList: IMusicData[]) => {
  // TrackPlayer.
};
