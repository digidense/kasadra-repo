```python
# File: kasadra-backend-repo/learning_app/models/admin-login.py

from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Although DB is PostgreSQL, for this example we create SQLite engine as requested
ENGINE_URL = "sqlite:///./test.db"

engine = create_engine(ENGINE_URL, echo=True, future=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class AdminLogin(Base):
    __tablename__ = "admin_login"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

# Optional: create tables if needed
if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
```