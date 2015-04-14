class Api::LibraryController < ApplicationController
    def index
        case request.headers['Authorization']
            when 'Token token=user'
            when 'Token token=admin'
                render :nothing => true, :status => 200

            when 'Token token=expired'
                render :text => 'Your session has expired', status: 401

            else
                render :text => 'Please login to access this page', status: 401
        end        
    end
end