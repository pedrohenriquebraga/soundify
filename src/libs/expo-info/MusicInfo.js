import * as FileSystem from 'expo-file-system';
import { decode, encode } from 'base-64';

import MusicInfoResponse from './MusicInfo';


import Buffer from './Buffer';

const BUFFER_SIZE = 256 * 1024;

const EMPTY = '';
const ID3_TOKEN = 'ID3';
const TITLE_TOKEN = 'TIT2';
const ARTIST_TOKEN = 'TPE1';
const ALBUM_TOKEN = 'TALB';
const GENRE_TOKEN = 'TCON';
const PICTURE_TOKEN = 'APIC';

class MusicInfo {
    static async getMusicInfoAsync(fileUri, options) {
        let loader = new MusicInfoLoader(fileUri, options);
        let result = await loader.loadInfo();
        return result;
    }
}

class MusicInfoLoader {
    constructor(fileUri, options) {
        this.fileUri = fileUri;
        this.expectedFramesNumber = 0;

        this.options = options ? {
            title: options.title ? options.title : true,
            artist: options.artist ? options.artist : true,
            album: options.album ? options.album : true,
            genre: options.genre ? options.genre : false,
            picture: options.picture ? options.picture : false
        } : {
            title: true,
            artist: true,
            album: true,
            genre: false,
            picture: false
        };
        
        if (this.options.title == true)
            this.expectedFramesNumber++;
        if (this.options.artist == true)
            this.expectedFramesNumber++;
        if (this.options.album == true)
            this.expectedFramesNumber++;
        if (this.options.genre == true)
            this.expectedFramesNumber++;
        if (this.options.picture == true)
            this.expectedFramesNumber++;

        this.buffer = new Buffer();
        this.filePosition = 0;
        this.dataSize = 0;
        this.frames = new Object();
        this.version = 0;
        this.finished = false;
    }

    async loadFileToBuffer() {
        let data = await FileSystem.readAsStringAsync(this.fileUri, {
            encoding: FileSystem.EncodingType.Base64,
            position: this.filePosition,
            length: BUFFER_SIZE
        });
        this.buffer.setData(Uint8Array.from(decode(data), c => c.charCodeAt(0)));
        this.filePosition += BUFFER_SIZE;
    }

    async loadInfo() {
        let info = await FileSystem.getInfoAsync(this.fileUri);
        this.dataSize = info.size;
        try {
            await this.process();

            let result = new MusicInfoResponse();
            if (this.options.title && this.frames[TITLE_TOKEN])
                result.title = this.frames[TITLE_TOKEN];
            if (this.options.artist && this.frames[ARTIST_TOKEN])
                result.artist = this.frames[ARTIST_TOKEN];
            if (this.options.album && this.frames[ALBUM_TOKEN])
                result.album = this.frames[ALBUM_TOKEN];
            if (this.options.genre && this.frames[GENRE_TOKEN])
                result.genre = this.frames[GENRE_TOKEN];
            if (this.options.picture && this.frames[PICTURE_TOKEN])
                result.picture = this.frames[PICTURE_TOKEN];
            return result;

        } catch (e) {
            if (e instanceof InvalidFileException)
                return null;
            else
                throw e;
        }
    }

    async process() {
        await this.processHeader();
        while (!this.finished)
            await this.processFrame();
    }

    async skip(length) {
        let remaining = length;
        while (remaining > 0) {
            if (this.buffer.finished()) {
                if (this.filePosition >= this.dataSize) {
                    this.finished = true;
                    break;
                }
                this.filePosition += remaining;
                await this.loadFileToBuffer();
                remaining = 0;
            } else 
                remaining -= this.buffer.move(remaining);
        }
    }

    async read(length) {
        let chunk = [];
        for (let i = 0; i < length; i++) {
            if (this.buffer.finished()) {
                if (this.filePosition >= this.dataSize) {
                    this.finished = true;
                    break;
                }
                await this.loadFileToBuffer();
            }
            chunk.push(this.buffer.getByte());
        }
        return chunk;
    }

    async readUntilEnd() {
        let byte = 0;
        let chunk = [];
        do {
            if (this.buffer.finished()) {
                if (this.filePosition >= this.dataSize) {
                    this.finished = true;
                    break;
                }
                await this.loadFileToBuffer();
            }
            byte = this.buffer.getByte();
            chunk.push(byte);
        } while (byte != 0);
        return chunk;
    }

    async processHeader() {
        let chunk = await this.read(3);
        let token = this.bytesToString(chunk);
        if (token !== ID3_TOKEN)
            throw new InvalidFileException();

        chunk = await this.read(2);
        this.version = this.bytesToInt([chunk[0]]);

        await this.skip(1);

        chunk = await this.read(4);
        let size = 0;
        for (let i = 0; i < chunk.length; i++) {
            size |= chunk[chunk.length - i - 1] << i * 7;
        }
        this.dataSize = size;
    }

    async processFrame() {
        let chunk = await this.read(4);
        let frameID = this.bytesToString(chunk);

        if (frameID === EMPTY)
            this.finished = true;
        else {
            chunk = await this.read(4);
            let frameSize = this.bytesToSize(chunk);

            await this.skip(2);
            switch (frameID) {
                case TITLE_TOKEN:
                    if (this.options.title)
                        await this.processTextFrame(frameID, frameSize);
                    else
                        await this.skip(frameSize);
                    break;
                case ARTIST_TOKEN:
                    if (this.options.artist)
                        await this.processTextFrame(frameID, frameSize);
                    else
                        await this.skip(frameSize);
                    break;
                case ALBUM_TOKEN:
                    if (this.options.album)
                        await this.processTextFrame(frameID, frameSize);
                    else
                        await this.skip(frameSize);
                    break;
                case GENRE_TOKEN:
                    if (this.options.genre)
                        await this.processTextFrame(frameID, frameSize);
                    else
                        await this.skip(frameSize);
                    break;
                case PICTURE_TOKEN:
                    if (this.options.picture)
                        await this.processPictureFrame(frameSize);
                    else
                        await this.skip(frameSize);
                    break;
                default:
                    await this.skip(frameSize);
                    break;
            }
            if (Object.keys(this.frames).length == this.expectedFramesNumber)
                this.finished = true;
        }
    }

    async processTextFrame(frameID, frameSize) {
        await this.skip(1);
        let remaining = frameSize - 1;
        let chunk = await this.read(remaining);
        let value = this.bytesToString(chunk);
        this.frames[frameID] = value;
    }

    async processPictureFrame(frameSize) {
        await this.skip(1);
        let remaining = frameSize - 1;
        
        let chunk = await this.readUntilEnd();
        remaining -= chunk.length;
        let mimeType = this.bytesToString(chunk);
        
        await this.skip(1);
        remaining -= 1;

        chunk = await this.readUntilEnd();
        remaining -= chunk.length;
        let description = this.bytesToString(chunk);

        let pictureData = await this.read(remaining);
        this.frames[PICTURE_TOKEN] = {
            description: description,
            pictureData: 'data:' + mimeType + ';base64,' + this.bytesToBase64(pictureData)
        };
    }

    bytesToString(bytes) {
        let s = '';
        for (let i = 0; i < bytes.length; i++) {
            if (bytes[i] >= 32 && bytes[i] <= 126)
                s += String.fromCharCode(bytes[i]);
        }
        return s;
    }

    bytesToInt(bytes) {
        let a = 0;
        for (let i = 0; i < bytes.length; i++)
            a |= bytes[bytes.length - i - 1] << i * 8;
        return a;
    }

    bytesToSize(bytes) {
        if (this.version == 3)
            return this.bytesToInt(bytes);
        else {
            let a = 0;
            for (let i = 0; i < bytes.length; i++)
                a |= bytes[bytes.length - i - 1] << i * 7;
            return a;
        }
    }

    bytesToBase64(bytes) {
        let s = '';
        for (let i = 0; i < bytes.length; i++)
            s += String.fromCharCode(bytes[i]);
        return encode(s);
    }
}

class InvalidFileException extends Error { 
    constructor() {
        super();
        this.name = 'InvalidFileException';
        this.message = 'Invalid file format.';
    }
}

export default MusicInfo;