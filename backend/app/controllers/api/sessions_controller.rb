class Api::SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
        case request.body.read
            when 'username=admin&password=secret'
                render json: {"token" => "admin", "user" => {"role" => "admin", "name" => "Administrator"}}, status: 201
            when 'username=user&password=secret'
                render json: {"token" => "user", "user" => {"role" => "user", "name" => "User"}}, status: 201
            else
                render :text => "The username and/or password was incorrect.", status: 401 
        end
    end

    def destroy 
    end

end
