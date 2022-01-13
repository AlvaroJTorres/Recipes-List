require 'httparty'

class RecipesController < ApplicationController
  def index
    return unless params[:search]

    @response = HTTParty.get(ENV['BASE_URL'] + "/recipes?search=#{params[:search]}&key=#{ENV['KEY']}")
    render json: @response.parsed_response
  end
end
