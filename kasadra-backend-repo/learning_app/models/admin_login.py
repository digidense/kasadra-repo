```python
# File: kasadra-backend-repo/learning_app/models/admin-login.py

from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Note: The instructions specify PostgreSQL DB but engine SQLite.
# Here, engine is set to SQLite for demo/testing. Adjust URL as needed.

Base = declarative_base()

class AdminLogin(Base):
    __tablename__ = 'admin_login'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)

# SQLite engine configuration
engine = create_engine('sqlite:///kasadra_learning_app.db', echo=True, future=True)

# Create tables
Base.metadata.create_all(engine)

# Create a configured "Session" class and session instance for usage
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
```