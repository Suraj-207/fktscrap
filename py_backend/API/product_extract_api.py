from py_backend.flipkart.product_extractor import Product
from flask_restful import Resource
from flask import request
import config

result = None


class FetchProduct(Resource):

    def post(self):
        try:
            global result
            val = request.get_json()['formData']['name']
            result = Product().get_details(val)
            config.logger.log("info", "request : " + val)
            return result
        except Exception as e:
            config.logger.log("error", str(e))


class SendProduct(Resource):
    def get(self):
        try:
            if result is not None:
                config.logger.log("info", "result : " + "Sending result...")
                return {"result": result}
            else:
                config.logger.log("warning", "no val specified")
        except Exception as e:
            config.logger.log("error", str(e))
