class PlaylistsController < ApplicationController
  def index
    playlists = Playlist.find_by(user_id: params[:id])
    render json: playlists
  end

  def destroy
    playlist = Playlist.find_by(id: params[:id])
    if playlist
      playlist.destroy
      head :no_content
    else
      render json: { error: 'playlist not found' }, status: :not_found
    end
  end
end
