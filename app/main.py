from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

quote = "There is a version of you which is funny, charismatic, interesting and rich. You're not him, but you need to make a plan to become him"

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/quote")
def get_quote():
    return {"quote": quote}

@app.get("/snp500")
def get_companies():
    companies = []
    with open("./app/snp500.json", "r") as file:
        companies = json.load(file)
    return {"companies": companies}