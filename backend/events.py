import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta

def get_events(year: int, month: int):
    try:
        if not (1 <= month <= 12):
            return {"error": "Invalid month. Must be between 1-12"}

        url = f"https://in-the-sky.org/newscal.php?year={year}&month={month}"
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        events = []

        for row in soup.find_all('tr'):
            for td in row.find_all("td"):
                date_tag = td.find('b')
                if date_tag:
                    day_str = date_tag.get_text(strip=True)
                    if day_str.isdigit():
                        day = int(day_str)
                        date_obj = datetime(year, month, day) + timedelta(days=1)
                        if date_obj.month != month:
                            continue

                        # full_date = date_obj.strftime("%B %d, %Y")
                        full_date = date_obj.strftime("%Y-%m-%d")

                        for item in td.find_all("div", class_="newscalitem"):
                            a_tag = item.find("a")
                            if a_tag:
                                title = a_tag.get_text(strip=True)
                                description = a_tag.get("title", "No description available")
                                events.append({
                                    "date": full_date,
                                    "title": title,
                                    "description": description
                                })

        return events

    except requests.RequestException as e:
        return {"error": f"Network error: {str(e)}"}
    except Exception as e:
        return {"error": f"Processing error: {str(e)}"}
