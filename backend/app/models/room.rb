class Room < ApplicationRecord
    has_many :messages, dependent: :destroy
    validates :name, presence: true, uniqueness: true

    after_create_commit {broadcast_message}

    private
    def broadcast_message
        ActionCable.server.broadcast("RoomsChannel",{type:"RoomCreated", data: {id:,name:,}})
    end
end
