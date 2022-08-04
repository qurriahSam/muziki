class Song < ApplicationRecord
  belongs_to :user
  has_many :playlist_songs
  has_one_attached :audio
end
