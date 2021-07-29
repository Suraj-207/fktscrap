from flask_restful import Resource
from flask import request
from py_backend.flipkart.product_extractor import Product
import config

review = None


class FetchReview(Resource):
    def post(self):
        try:
            global review
            href = request.get_json()['href']
            review = Product().get_review(href)
            config.logger.log("info", "href : " + str(href))
        except Exception as e:
            config.logger.log("error", str(e))


class SendReview(Resource):
    def get(self):
        try:
            global review
            if review is not None:
                config.logger.log('info', "review sending...")
                return review
            else:
                config.logger.log("warning", "no href specified")
        except Exception as e:
            config.logger.log("error", str(e))
