from py_backend.flipkart.product_extractor import Product
from flask_restful import Resource
from flask import request
from py_backend.logger.log_db import Logger

logger = Logger('fktscrap')
val = None


class FetchProduct(Resource):
    def post(self):
        global logger
        try:
            global val
            val = request.get_json()['formData']['name']
            logger.log("info", "request : " + val)
        except Exception as e:
            logger.log("error", str(e))


class SendProduct(Resource):
    def get(self):
        global logger
        try:
            global val
            if val is not None:
                result = Product(logger).get_details(val)
                val = None
                logger.log("info", "result : " + str(result))
                return {"result": result}
            else:
                logger.log("warning", "no val specified")
        except Exception as e:
            logger.log("error", str(e))
