class SongSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :artist, :user_id, :audio

  def audio
    if object.audio.attached?
      {
        url: rails_blob_url(object.audio, only_path: true)
      }
    end
  end
end
