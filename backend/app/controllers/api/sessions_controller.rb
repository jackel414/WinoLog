class Api::SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :set_session, only: [:create]

    def create
        case request.body.read
            when 'username=admin&password=secret'
                render json: @session, status: 201
            when 'username=user&password=secret'
                render json: {"token" => "user", "user" => {"role" => "user", "name" => "User"}}, status: 201
            else
                render :text => 'Test', status: 200
        end
    end

    def destroy 
    end

    def set_session
        @session = {"token" => "admin", "user" => {"role" => "admin", "name" => "Administrator"}}
    end

end
