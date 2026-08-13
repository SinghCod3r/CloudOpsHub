from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    app_env: str = "development"
    secret_key: str = "supersecretkey"
    log_level: str = "INFO"
    database_url: str = "sqlite:///./sql_app.db" # Default for local if not provided
    api_url: str = "http://localhost:8000"

    class Config:
        env_file = "../.env"
        env_file_encoding = 'utf-8'

settings = Settings()
