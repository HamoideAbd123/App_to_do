from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 


app = FastAPI ()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/")
def root():
  return("hello world")

@app.get("/home")
def home():
  return{"message":"hello world" ,"name":"mohamd","age":"28"}


