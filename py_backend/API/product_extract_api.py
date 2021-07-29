from py_backend.flipkart.product_extractor import Product
from flask_restful import Resource
from flask import request
from py_backend.logger.log_db import Logger

logger = Logger('fktscrap')


class FetchProduct(Resource):
    def post(self):
        global logger
        try:
            val = request.get_json()['formData']['name']
            logger.log("info", "request : " + val)
            product = Product()
            result = product.get_details(val)
            logger.log("info", "result : " + str(result))
            return {"result": result}
        except Exception as e:
            logger.log("error", str(e))
