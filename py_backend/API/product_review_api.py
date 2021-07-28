from flask_restful import Resource
from flask import request
from py_backend.flipkart.product_extractor import Product


class ReviewProduct(Resource):
    def post(self):
        href = request.get_json()['href']
        product = Product()
        return product.get_review(href)
