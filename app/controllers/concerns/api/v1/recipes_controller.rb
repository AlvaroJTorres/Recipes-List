require 'httparty'

module Api
  module V1
    class RecipesController < ApplicationController
      skip_before_action :verify_authenticity_token

      def index
        return unless params[:search]

        @response = HTTParty.get(ENV['BASE_URL'] + "/recipes?search=#{params[:search]}&key=#{ENV['KEY']}")
        render json: @response.parsed_response
      end

      def show
        @response = HTTParty.get(ENV['BASE_URL'] + "/recipes/#{params[:id]}?key=#{ENV['KEY']}")
        render json: @response.parsed_response
      end

      def create
        p params
        options = {
          headers: {
            'Content-Type' => 'application/json'
          },
          body: define_body(params).to_json
        }
        @response = HTTParty.post(ENV['BASE_URL'] + "/recipes/?key=#{ENV['KEY']}", options)
        render json: @response.parsed_response
      end

      private

      def define_body(params)
        {
          title: params[:title],
          source_url: params[:source_url],
          image_url: params[:image_url],
          publisher: params[:publisher],
          cooking_time: params[:cooking_time],
          servings: params[:servings],
          ingredients: params[:ingredients],
          key: ENV['KEY']
        }
      end
    end
  end
end
