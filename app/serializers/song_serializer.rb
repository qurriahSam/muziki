class SongSerializer < ActiveModel::Serializer
  attributes :id, :name, :artist, :user_id, :audio
end
