import * as MediaLibray from "expo-media-library"

export interface IMusicData {
  index: number;
  name: string;
  path: string;
  duration: number;
  albumId: string;
  cover: string;
  artist: string;
  year: string;
}

export interface IProcessedMusic {
  index: number;
  name: string;
  artist: string;
  path: string;
  duration: number;
  albumId: string;
  contentType: MediaLibrary.MediaTypeValue;
  date: number;
  year: string;
  cover: string;
}
