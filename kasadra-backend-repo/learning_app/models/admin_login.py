```python
# File: kasadra-backend-repo/learning_app/models/admin-login.py

from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class AdminLogin(Base):
    __tablename__ = 'admin_login'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

# Engine setup for SQLite (despite the mention of PostgreSQL database)
engine = create_engine('sqlite:///./test.db', echo=True)

# Create all tables
Base.metadata.create_all(bind=engine)

# Session local
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
```