export declare class MusicInfo {
    static getMusicInfoAsync(fileUri: string, options?: MusicInfoOptions): Promise<MusicInfoResponse?>;
}

export declare class MusicInfoOptions {
    title?: boolean;
    artist?: boolean;
    album?: boolean;
    genre?: boolean;
    picture?: boolean;
}

export declare class MusicInfoResponse {
    title?: string;
    artist?: string;
    album?: string;
    genre?: string;
    picture?: Picture
}

export declare class Picture {
    description: string;
    pictureData: string;
}