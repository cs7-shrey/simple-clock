from fastapi import FastAPI, Request, status, WebSocket, WebSocketDisconnect
import random
import asyncio
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

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Generate a random number between 1 and 10
            random_number = random.randint(1, 10)
            # Send the random number to the WebSocket client
            await websocket.send_text(str(random_number))
            # Wait for 2 seconds before sending the next number
            await asyncio.sleep(2)
    except WebSocketDisconnect:
        print("Client disconnected")