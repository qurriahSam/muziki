class SongsController < ApplicationController
  def show
    songs = Song.where(user_id: params[:id])
    render json: songs
  end

  def update
    song = Song.find_by(id: params[:id])

    song.update(update_params)
    render json: song
  end

  def create
    song = Song.create!(song_params)
    render json: song, status: :created
  end

  def destroy
    song = Song.find_by(id: params[:id])

    song.destroy
    render json: {}
  end

  private

  def song_params
    params.permit(:name, :artist, :user_id, :audio)
  end

  def update_params
    params.permit(:name, :artist, :id)
  end
end
