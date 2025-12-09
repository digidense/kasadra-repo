```python
# File: kasadra-backend-repo/learning_app/models/admin-login.py

from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

Base = declarative_base()

class AdminLogin(Base):
    __tablename__ = 'admin_logins'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

# Engine setup - SQLite as requested, though database is PostgreSQL (usually you'd match these)
engine = create_engine('sqlite:///./test.db', echo=True)

# Create all tables
Base.metadata.create_all(bind=engine)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

if __name__ == "__main__":
    # Example usage: create a new admin login entry
    session = SessionLocal()
    new_admin = AdminLogin(name="admin_user")
    session.add(new_admin)
    session.commit()
    session.close()
```