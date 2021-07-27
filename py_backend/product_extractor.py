from bs4 import BeautifulSoup as bs
from urllib.request import urlopen
from urllib.parse import quote


class Product:

    def __init__(self, name):
        self.name = name

    def get_details(self):
        products = []
        url = "https://www.flipkart.com"
        search_query = "/search?q=" + quote(self.name)
        res = urlopen(url + search_query)
        soup = bs(res.read(), "html.parser")
        pages = [i['href'] for i in soup.find_all("a", {"class": "ge-49M"})]

        for page in pages:
            res = urlopen(url + page)
            soup = bs(res.read(), "html.parser")

            # type 1
            results1 = soup.find_all("div", {"class": "_2kHMtA"})
            for i in results1:
                json = dict()
                json["name"] = i.find("div", {"class": "_4rR01T"}).getText()
                json["href"] = i.find("a", {"class": "_1fQZEK"})['href']
                json["img_link"] = i.find("div", {"class": "CXW8mj"}).img['src']
                json["price"] = i.find("div", {"class": "_30jeq3"}).getText()
                products.append(json)

            # type 2
            results2 = soup.find_all("div", {"class": "_4ddWXP"})
            for i in results2:
                json = dict()
                json["name"] = i.find("a", {"class": "s1Q9rs"}).getText()
                json["href"] = i.find("a", {"class": "s1Q9rs"})['href']
                json["img_link"] = i.find("div", {"class": "CXW8mj"}).img['src']
                json["price"] = i.find("div", {"class": "_30jeq3"}).getText()
                products.append(json)

            # type 3
            results3 = soup.find_all("div", {"class": "_1xHGtK _373qXS"})
            for i in results3:
                json = dict()
                if i.find("div", {"class": "_2WkVRV"}) is not None:
                    json["brand_name"] = i.find("div", {"class": "_2WkVRV"}).getText()
                json["name"] = i.find("a", {"class": "IRpwTa"}).getText()
                json["href"] = i.find("a", {"class": "IRpwTa"})["href"]
                json["img_link"] = i.find("div", {"class": "_312yBx SFzpgZ"}).img
                json["price"] = i.find("div", {"class": "_30jeq3"}).getText()
                products.append(json)
        return products
