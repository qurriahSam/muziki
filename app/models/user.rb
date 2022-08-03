class User < ApplicationRecord
  has_many :songs
  has_secure_password

  validates :user, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
end
