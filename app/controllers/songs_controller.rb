class SongsController < ApplicationController
  def index
    songs = Song.all
    render json: songs
  end

  def create
    song = Song.create!(song_params)
    render json: song, status: :created
  end

  private

  def song_params
    params.permit(:name, :artist, :user_id, :audio)
  end
end
