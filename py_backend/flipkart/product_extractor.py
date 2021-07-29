from bs4 import BeautifulSoup as bs
from urllib.request import urlopen
from urllib.parse import quote
import config


class Product:

    def __init__(self):
        self.logger = config.logger
        self.url = "https://www.flipkart.com"

    def get_details(self, name):
        try:
            count = 1
            products = []
            search_query = "/search?q=" + quote(name)
            res = urlopen(self.url + search_query)
            soup = bs(res.read(), "html.parser")
            pages = [i['href'] for i in soup.find_all("a", {"class": "ge-49M"})]

            for page in pages[:2]:
                if count != 1:
                    res = urlopen(self.url + page)
                    soup = bs(res.read(), "html.parser")

                # type 1
                results1 = soup.find_all("div", {"class": "_2kHMtA"})
                for i in results1:
                    json = dict()
                    json['id'] = count
                    count += 1
                    json["name"] = i.find("div", {"class": "_4rR01T"}).getText()
                    json["href"] = i.find("a", {"class": "_1fQZEK"})['href']
                    json["img_link"] = i.find("div", {"class": "CXW8mj"}).img['src']
                    json["price"] = i.find("div", {"class": "_30jeq3"}).getText()
                    products.append(json)

                # type 2
                results2 = soup.find_all("div", {"class": "_4ddWXP"})
                for i in results2:
                    json = dict()
                    json['id'] = count
                    count += 1
                    json["name"] = i.find("a", {"class": "s1Q9rs"}).getText()
                    json["href"] = i.find("a", {"class": "s1Q9rs"})['href']
                    json["img_link"] = i.find("div", {"class": "CXW8mj"}).img['src']
                    json["price"] = i.find("div", {"class": "_30jeq3"}).getText()
                    products.append(json)

                # type 3
                results3 = soup.find_all("div", {"class": "_1xHGtK _373qXS"})
                for i in results3:
                    json = dict()
                    json['id'] = count
                    count += 1
                    if i.find("div", {"class": "_2WkVRV"}) is not None:
                        json["brand_name"] = i.find("div", {"class": "_2WkVRV"}).getText()
                    json["name"] = i.find("a", {"class": "IRpwTa"}).getText()
                    json["href"] = i.find("a", {"class": "IRpwTa"})["href"]
                    json["img_link"] = i.find("div", {"class": "_312yBx SFzpgZ"}).img['src']
                    json["price"] = i.find("div", {"class": "_30jeq3"}).getText()
                    products.append(json)
            return products
        except Exception as e:
            self.logger.log("error", str(e))

    def get_review(self, href):
        try:
            review_url = self.url + href
            res = urlopen(review_url)
            soup = bs(res.read(), "html.parser")
            # type 1 check
            result = soup.find("div", {"class": "col JOpGWq"})
            type_of_page = 1
            reviews = []
            if result is None:
                # type 2 check
                result = soup.find("div", {"class": "col JOpGWq _33R3aa"})
                type_of_page = 2

            if result.find_all('span')[-1].getText().find('All') != -1 and result.find_all('span')[-1].getText().find(
                    'reviews') != -1:
                all_reviews_page_url = self.url + result.find_all('a')[-1]['href']
                self.logger.log("info", "more than 5 reviews, redirecting to all reviews page...")
                res = urlopen(all_reviews_page_url)
                soup1 = bs(res.read(), "html.parser")
                if type_of_page == 1:
                    reviews = [dict(zip(['rating', 'review', 'name'], [j.getText() for j in i.find_all('div')][1:6:4] + [
                        i.find('p', {'class': '_2sc7ZR _2V5EHH'}).getText()])) for i in
                               soup1.find_all("div", {"class": "col _2wzgFH K0kLPL"})]
                elif type_of_page == 2:
                    reviews = [dict(zip(['rating', 'review', 'name'], [j.getText() for j in i.find_all('div')][3:5] + [
                        i.find('p', {'class': '_2sc7ZR _2V5EHH _1QgsS5'}).getText()])) for i in
                               soup1.find_all("div", {"class": "col _2wzgFH K0kLPL _1QgsS5"})]
            else:
                if type_of_page == 1:
                    reviews = [dict(zip(['rating', 'review', 'name'], [j.getText() for j in i.find_all('div')][1:6:4] + [
                        i.find('p', {'class': '_2sc7ZR _2V5EHH'}).getText()])) for i in
                               soup.find_all("div", {"class": "col _2wzgFH"})]
                elif type_of_page == 2:
                    reviews = [dict(zip(['rating', 'review', 'name'], [j.getText() for j in i.find_all('div')][3:5] + [
                        i.find('p', {'class': '_2sc7ZR _2V5EHH _1QgsS5'}).getText()])) for i in
                               soup.find_all("div", {"class": "col _2wzgFH _1QgsS5"})]
            return reviews
        except Exception as e:
            self.logger.log("error", str(e))
