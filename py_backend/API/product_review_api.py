from flask_restful import Resource
from flask import request
from py_backend.flipkart.product_extractor import Product
from py_backend.logger.log_db import Logger

href = None
logger = Logger('fktscrap')


class FetchReview(Resource):
    def post(self):
        global logger
        try:
            global href
            href = request.get_json()['href']
            logger.log("info", "href : " + str(href))
        except Exception as e:
            logger.log("error", str(e))


class SendReview(Resource):
    def get(self):
        global logger
        try:
            global href
            if href is not None:
                review = Product().get_review(href)
                href = None
                return review
            else:
                logger.log("info", "no href specified")
                return None
        except Exception as e:
            logger.log("error", str(e))
