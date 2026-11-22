import os
import mysql.connector
from dotenv import load_dotenv

# Read the secrets from the .env file
load_dotenv()


def get_connection():
    """Open a connection to our MySQL database (XAMPP)."""
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        port=int(os.getenv("DB_PORT", 3306)),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
    )