import re
import requests
from bs4 import BeautifulSoup
import html

# Function to remove function-like patterns and slashes
def clean_content(content):
    # Decode HTML entities (e.g., &amp; becomes &)
    content = html.unescape(content)
    
    # Remove everything except alphanumeric characters and spaces
    content = re.sub(r'[^a-zA-Z0-9\s]', '', content)  # Keep only letters, numbers, and spaces
    
    # Remove any extra white spaces
    content = re.sub(r'\s+', ' ', content).strip()

    return content

# Define the scraping functions for different websites

def scrapeTOI(soup):
    heading = soup.find('h1').find('span').get_text()
    content = soup.find(class_="_s30J clearfix").get_text()
    content = clean_content(content)  # Clean content
    return {
        "title": heading,
        "content": content
    }

def scrapeIndiaToday(soup):
    heading = soup.find('h1').getText()
    ptags = soup.find(class_="jsx-ace90f4eca22afc7 Story_description__fq_4S description paywall").find_all("p")
    content = ""
    for p in ptags:
        content += p.get_text()
    content = clean_content(content)  # Clean content
    return {
        "title": heading,
        "content": content
    }

def scrapeIndianExpress(soup):
    heading = soup.find('h1').get_text()
    ptags = soup.find(class_="story_details").find_all("p")
    content = ""
    for p in ptags:
        content += p.get_text()
    content = clean_content(content)  # Clean content
    return {
        "title": heading,
        "content": content
    }

def scrapeTheHindu(soup):
    heading = soup.find('h1').get_text()
    ptags = soup.find(class_="articlebodycontent col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12").find_all("p")
    content = ""
    for p in ptags:
        content += p.get_text()
    content = clean_content(content)  # Clean content
    return {
        "title": heading,
        "content": content
    }

def scrapeNDTV(soup):
    heading = soup.find('h1').get_text()
    ptags = soup.find(class_="Art-exp_wr").find_all("p")
    content = ""
    for p in ptags:
        content += p.get_text()
    content = clean_content(content)  # Clean content
    return {
        "title": heading,
        "content": content
    }

# Function to detect the news website and scrape accordingly
def scrape_news(url):
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        if 'ndtv.com' in url:
            return scrapeNDTV(soup)
        elif 'timesofindia.indiatimes.com' in url:
            return scrapeTOI(soup)
        elif 'indiatoday.in' in url:
            return scrapeIndiaToday(soup)
        elif 'indianexpress.com' in url:
            return scrapeIndianExpress(soup)
        elif 'thehindu.com' in url:
            return scrapeTheHindu(soup)
        else:
            return {"error": "Unsupported news website"}
    else:
        return {"error": f"Failed to retrieve the page. Status code: {response.status_code}"}

# # Example usage:
# url = 'https://www.ndtv.com/india-news/reddit-users-rant-on-moving-to-bengaluru-from-noida-is-viral-says-is-south-indian-7965078'
# result = scrape_news(url)
# print(result)
