class Api::LibraryController < ApplicationController
    def index
        render json: nil, status: 200
    end
end