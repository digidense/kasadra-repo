from sqlalchemy import Column, Integer, String
from .base import Base


class LiveClass(Base):
    __tablename__ = "live_class"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    status = Column(String, nullable=True)
    completion = Column(String, nullable=True)
