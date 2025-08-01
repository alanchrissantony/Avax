from django_filters import rest_framework as dj_filters
from rest_framework import generics, permissions, status, views
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from apps.analytics.models import PlaylistPlayed
from apps.audio.models import Track
from apps.core import filters, pagination
from apps.core.permissions import IsOwnerUserPermission
from apps.playlists.api.serializers import (
    FavoritePlaylistSerializer,
    PlaylistSerializer,
    ShortPlaylistSerializer,
    UpdatePlaylistSerializer,
)
from apps.playlists.models import FavoritePlaylist, Playlist


class PlaylistListAPIView(generics.ListAPIView):
    """
    Playlist List API View. Public view.
    """

    permission_classes = [permissions.AllowAny]
    serializer_class = ShortPlaylistSerializer
    pagination_class = pagination.StandardResultsSetPagination
    filter_backends = [dj_filters.DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = filters.PlaylistFilter
    search_fields = ["user__display_name", "title", "tracks__title", "genre__name"]
    ordering_fields = ["release_date", "created_at"]

    def get_queryset(self):
        return Playlist.objects.select_related("user", "genre").prefetch_related("tracks").filter(is_private=False)


class PlaylistDetailAPIView(generics.RetrieveAPIView):
    """
    Playlist Detail API View. Public view.
    """

    permission_classes = [permissions.AllowAny]
    serializer_class = PlaylistSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Playlist.objects.select_related("user", "genre").filter(is_private=False)

    def retrieve(self, request, *args, **kwargs):
        playlist = self.get_object()
        viewer_ip = request.META.get("REMOTE_ADDR", None)

        PlaylistPlayed.record_listening(
            user=request.user if request.user.is_authenticated else None,
            playlist=playlist,
            viewer_ip=viewer_ip,
        )

        return super().retrieve(request, *args, **kwargs)


class PlaylistRecentlyPlayedAPIView(generics.ListAPIView):
    """
    List all recently played playlist. Public view.
    Filter last played 10 playlist by users or anonymous(by viewer IP).
    """

    permission_classes = [permissions.AllowAny]
    serializer_class = ShortPlaylistSerializer
    pagination_class = pagination.StandardResultsSetPagination
    filter_backends = [dj_filters.DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = filters.PlaylistFilter
    search_fields = ["user__display_name", "title", "tracks__title", "genre__name"]
    ordering_fields = ["release_date", "created_at"]

    def get_queryset(self):
        viewer_ip = self.request.META.get("REMOTE_ADDR", None)

        if self.request.user.is_authenticated:
            return (
                Playlist.objects.select_related("user", "genre")
                .prefetch_related("tracks")
                .filter(is_private=False, playlist_plays__user=self.request.user)
                .order_by("-playlist_plays__played_at")[:10]
            )

        if viewer_ip:
            return (
                Playlist.objects.select_related("user", "genre")
                .prefetch_related("tracks")
                .filter(is_private=False, playlist_plays__viewer_ip=viewer_ip)
                .order_by("-playlist_plays__played_at")[:10]
            )

        return Playlist.objects.none()


class MyPlaylistListCreateAPIView(generics.ListCreateAPIView):
    """
    My Playlist List Create API View.
    Private view, only for authenticated users and owner.
    """

    permission_classes = [IsOwnerUserPermission]
    serializer_class = PlaylistSerializer
    pagination_class = pagination.StandardResultsSetPagination
    filter_backends = [dj_filters.DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = filters.MyPlaylistFilter
    search_fields = ["user__display_name", "title", "tracks__title", "genre__name"]
    ordering_fields = ["release_date", "created_at"]

    def get_queryset(self):
        return (
            Playlist.objects.select_related("user", "genre")
            .prefetch_related("tracks", "tracks__artist", "tracks__album", "tracks__genre")
            .filter(user=self.request.user)
        )

    def perform_create(self, serializer):
        playlist = serializer.save(user=self.request.user)
        FavoritePlaylist.objects.create(user=self.request.user, playlist=playlist)


class MyPlaylistDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    My Playlist Detail API View.
    Private view, only for authenticated users and owner.
    """

    permission_classes = [IsOwnerUserPermission]
    lookup_field = "slug"

    def get_queryset(self):
        return (
            Playlist.objects.select_related("user", "genre")
            .prefetch_related("tracks", "tracks__artist", "tracks__album", "tracks__genre")
            .filter(user=self.request.user)
        )

    def get_serializer_class(self):
        if self.request.method == "GET":
            return PlaylistSerializer
        else:
            return UpdatePlaylistSerializer

    def perform_destroy(self, instance):
        FavoritePlaylist.objects.filter(user=self.request.user, playlist=instance).delete()
        instance.delete()


class PlaylistFavoriteListAPIView(generics.ListAPIView):
    """
    Favorite Playlist List API View.
    Private view, only for authenticated users and owner.
    """

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FavoritePlaylistSerializer
    pagination_class = pagination.StandardResultsSetPagination
    filter_backends = [dj_filters.DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = filters.FavoritePlaylistFilter
    search_fields = ["user__display_name", "playlist__title", "playlist__tracks__title", "playlist__genre__name"]
    ordering_fields = ["playlist__release_date", "playlist__created_at"]

    

    def get_queryset(self):
        
        return FavoritePlaylist.objects.select_related("user", "playlist", "playlist__genre", "playlist__user").filter(
            user=self.request.user
        )


class PlaylistFavoriteCreateAPIView(views.APIView):
    """
    Favorite Playlist Create API View.
    Private view, only for authenticated users and owner.
    - `POST`: Add playlist to favorites.
    1. If playlist already in favorites, return `HTTP_400_BAD_REQUEST.
    2. If playlist not in favorites, create new favorite and return `HTTP_201_CREATED`.
    - `DELETE`: Remove playlist from favorites.
    1. If playlist not in favorites, return `HTTP_404_NOT_FOUND`.
    2. If playlist in favorites, delete favorite and return `HTTP_204_NO_CONTENT`.
    """

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = None

    def post(self, request, *args, **kwargs):
        playlist = get_object_or_404(Playlist, slug=kwargs.get("slug"), is_private=False)
        favorite_playlist, created = FavoritePlaylist.objects.get_or_create(user=request.user, playlist=playlist)
        if not created:
            return Response({"msg": "Playlist already added to favorites"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"msg": "Playlist added to favorites"}, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        playlist = get_object_or_404(Playlist, slug=kwargs.get("slug"), is_private=False)
        favorite_playlist = get_object_or_404(FavoritePlaylist, user=request.user, playlist=playlist)
        favorite_playlist.delete()
        return Response({"msg": "Playlist removed from favorites"}, status=status.HTTP_204_NO_CONTENT)


class AddRemoveTrackPlaylistAPIView(views.APIView):
    """
    Add Remove Track Playlist API View.
    Private view, only for authenticated users and owner.
    - `POST`: Add track to playlist.
    1. If track already in playlist, return `HTTP_400_BAD_REQUEST.
    2. If track not in playlist, add track to playlist and return `HTTP_201_CREATED`.
    - `DELETE`: Remove track from playlist.
    1. If track not in playlist, return `HTTP_404_NOT_FOUND`.
    2. If track in playlist, remove track from playlist and return `HTTP_204_NO_CONTENT`.
    """

    permission_classes = [IsOwnerUserPermission]
    serializer_class = None

    def post(self, request, *args, **kwargs):
        playlist = get_object_or_404(Playlist, user=request.user, slug=kwargs.get("slug"))
        track = get_object_or_404(Track, slug=kwargs.get("track_slug"))
        if track in playlist.tracks.all():
            return Response({"msg": "Track already in playlist"}, status=status.HTTP_400_BAD_REQUEST)
        playlist.tracks.add(track)
        return Response({"msg": "Track added to playlist"}, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        playlist = get_object_or_404(Playlist, user=request.user, slug=kwargs.get("slug"))
        track = get_object_or_404(Track, slug=kwargs.get("track_slug"))
        if track not in playlist.tracks.all():
            return Response({"msg": "Track not in playlist"}, status=status.HTTP_404_NOT_FOUND)
        playlist.tracks.remove(track)
        return Response({"msg": "Track removed from playlist"}, status=status.HTTP_204_NO_CONTENT)
