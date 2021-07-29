from flask_restful import Resource
from flask import request
from py_backend.flipkart.product_extractor import Product

href = None


class FetchReview(Resource):
    def post(self):
        global href
        href = request.get_json()['href']


class SendReview(Resource):
    def post(self):
        global href
        if href is not None:
            review = Product().get_review(href)
            href = None
            return review
        else:
            return {'message': 'no href found'}
