from bs4 import BeautifulSoup
import json
import requests


def extract_cards(html_file):

	with open(html_file) as crap:
		c = crap.read()
		

	soup = BeautifulSoup(c)
	biddy = soup.find("div", {"id": "biddy_card_list"})
	d = biddy.find_all('p')
	card_titles = biddy.find_all('h4')
	images = biddy.find_all("img")
	links = biddy.find_all("a")
	return card_titles, d, images, links


files = ['crap.html', 'wands.html', 'cups.html','swords.html','pentacles.html']


cards = {}
c = 0
for f in files:
	titles, d, images, links = extract_cards(f)
	for t in range(len(titles)):
		cards[c] = {"title":titles[t].get_text()}
		cards[c]["upright"] = d[t*2].get_text().lower()
		cards[c]["reversed"] = d[t*2+1].get_text().lower()
		cards[c]["img"] = images[t]['src']
		cards[c]["link"] = links[t]['href']
		c += 1


with open("cards.json", "w") as cards_json:
	cards_json.write(json.dumps(cards))


# with open("cards.json") as c:
# 	x = json.loads(c.read())
# 	for i in x:
# 		response = requests.get(x[i]['src'])
# 		file = open("pics/" + str(i) + ".png", "wb")
# 		file.write(response.content)
# 		file.close()
