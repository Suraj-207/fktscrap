from py_backend.flipkart.product_extractor import Product
from flask_restful import Resource
from flask import request


class FetchProduct(Resource):
    def post(self):
        val = request.get_json()['formData']['name']
        product = Product()
        result = product.get_details(val)
        print(result)
        return {"result": result}
