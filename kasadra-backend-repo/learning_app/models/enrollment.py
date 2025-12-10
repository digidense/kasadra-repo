from datetime import date
from sqlalchemy import Column, Integer, String, Date, ForeignKey, UniqueConstraint
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Enrollment(Base):
    __tablename__ = "enrollment"
    __table_args__ = (
        UniqueConstraint("student_id", "course_id", name="uq_student_course"),
    )

    id: int = Column(Integer, primary_key=True)
    student_id: int = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id: int = Column(Integer, ForeignKey("courses.id"), nullable=False)
    enrolled_at: date = Column(Date, default=date.today, nullable=False)
    status: str = Column(String, default="active", nullable=False)