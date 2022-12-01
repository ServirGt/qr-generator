import urllib.parse
import requests
from flask import Flask, request, make_response, redirect, render_template
from quickchart import QuickChart
from bs4 import BeautifulSoup

app = Flask(__name__)


vc2 = "BEGIN:VCARD"
vc3 = "VERSION:3.0"
vc3 = "N:Heinemann;Rodolfo"
vc4 = "FN:Rodolfo Heinemann"
vc5 = "ORG:CENDIS"
vc6 = "TITLE:Director General"
vc7 = "ADR:;;2a Calle 9-15;Zona 10;CA;Edificio Mira Of. 101;Guatemala, Guatemala"
vc8 = "TEL;WORK;VOICE:+502 23795300"
vc9 = "TEL;CELL:+502 54035000"
vc10 = "TEL;MAIN:+502 23795303"
vc11 = "EMAIL;WORK;INTERNET:rodolfoh@centrodistribuidor.com"
vc12 = "URL:https://cendis.com.gt"
vc13 = "END:VCARD"

vc14 = "dark=001E61"
vc15 = "format=svg"

vc = vc2 + "\n" + vc3 + "\n" + vc4 + "\n" + vc5 + "\n" + vc6 + "\n" + vc7 + "\n" + vc8 + "\n" + vc9 + "\n" + vc10 + "\n" + vc11 + "\n" + vc12 + "\n" + vc13


safe_string = urllib.parse.quote_plus(vc)
# print(safe_string)
# print()
# print()
# print("https://quickchart.io/qr?text="+safe_string+"&"+vc14+"&"+vc15)
url = "https://quickchart.io/qr?text="+safe_string+"&"+vc14+"&"+vc15

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/hello/')
def hello():
    # return render_template('hello.html', name=name)
    url = "https://quickchart.io/qr?text="+safe_string+"&"+vc14

    # print(ur l)
    return render_template('hello.html', url=url)