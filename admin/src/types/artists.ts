export interface Artist {
    name: string;
    email: string;
    dateOfBirth?: string;
    imageUrl?: string;
    bio?: string;
    genre?: string;
    social_links?: string;
    verified: string;
    followers_count: string;
    created_at: string;
    updated_at: string;
    is_active: string;
  }

export interface ArtistState {
    artists: Artist[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}