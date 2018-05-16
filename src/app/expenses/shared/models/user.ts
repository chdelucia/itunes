
  export interface ArtistResponse {
      resultCount: number;
      results: Artist[];
  }

export interface Artist {
  wrapperType: string;
  artistType: string;
  artistName: string;
  artistLinkUrl: string;
  artistId: number;
  amgArtistId: number;
  primaryGenreName: string;
  primaryGenreId: number;
  collectionType: string;
  collectionId?: number;
  collectionName: string;
  collectionCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice?: number;
  collectionExplicitness: string;
  trackCount?: number;
  copyright: string;
  country: string;
  currency: string;
  releaseDate?: Date;
}

export interface AlbumResponse {
  resultCount: number;
  results: Song[];
}

export interface Song {
  wrapperType: string;
  collectionType: string;
  artistId: number;
  collectionId: number;
  amgArtistId: number;
  artistName: string;
  collectionName: string;
  collectionCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  collectionExplicitness: string;
  trackCount: number;
  copyright: string;
  country: string;
  currency: string;
  releaseDate: Date;
  primaryGenreName: string;
  kind: string;
  trackId?: number;
  trackName: string;
  trackCensoredName: string;
  trackViewUrl: string;
  previewUrl: string;
  artworkUrl30: string;
  trackPrice?: number;
  trackExplicitness: string;
  discCount?: number;
  discNumber?: number;
  trackNumber?: number;
  trackTimeMillis?: number;
  isStreamable?: boolean;
}

