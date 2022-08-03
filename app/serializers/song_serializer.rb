class SongSerializer < ActiveModel::Serializer
  attributes :id, :name, :artist, :user_id
end
