require 'httparty'

class RecipesController < ApplicationController
  def index
    return unless params[:search]

    @response = HTTParty.get(ENV['BASE_URL'] + "/recipes?search=#{params[:search]}&key=#{ENV['KEY']}")
    render json: @response.parsed_response
  end

  def show
    @response = HTTParty.get(ENV['BASE_URL'] + "/recipes/#{params[:id]}?key=#{ENV['KEY']}")
    render json: @response.parsed_response
  end
end
