class SessionsController < ApplicationController
    def login
        name = params[:name]

        user = User.find_or_create_by(name: name)

        render json: {message: "Login success", user: user},status: :ok

    rescue StandardError => e
        render json: { message: "Error: #{e.message}" }, status: :unprocessable_entity
    end
end
