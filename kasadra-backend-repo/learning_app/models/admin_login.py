```python
# File: kasadra-backend-repo/learning_app/models/admin-login.py

from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Base declarative class
Base = declarative_base()

class AdminLogin(Base):
    __tablename__ = 'admin_login'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)

    def __repr__(self):
        return f"<AdminLogin(id={self.id}, name='{self.name}')>"

# Engine configuration: Using SQLite engine as specified
# (Note: Database is PostgreSQL but engine for now is SQLite as per your specs)
DATABASE_URL = "sqlite:///./test_admin_login.db"

engine = create_engine(DATABASE_URL, echo=True, future=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
```