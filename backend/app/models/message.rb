class Message < ApplicationRecord
  belongs_to :user
  belongs_to :room

  validates :body, presence: true

  after_create_commit {broadcast_message}

  private
  def broadcast_message
    ActionCable.server.broadcast("room_#{room.id}",{type: "Chat",data: {id:,body:,room_id:,user_id:}})
  end
end
