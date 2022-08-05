class PlaylistSongsController < ApplicationController
  def create
    playlist_song = PlaylistSong.create!(playlist_params)
    render json: playlist_song, status: :created
  end

  def destroy
    playlist_song = PlaylistSong.find_by(id: params[:id])
    if playlist_song
      playlist_song.destroy
      head :no_content
    else
      render json: { error: 'song not found in playlist' }, status: :not_found
    end
  end

  private

  def playlist_params
    params.permit(:playlist_id, :song_id)
  end
end
