enum EUserStatus {
  ACTIVE = "ACTIVE",
  UNACTIVE = "UNACTIVE",
  BANNED = "BANNED",
}
enum EUserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  EXPERT = "EXPERT",
}
enum ECourseStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}
enum ECourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}
enum ELessonType {
  VIDEO = "VIDEO",
  TEXT = "TEXT",
}
enum EOrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}
enum ECouponStatus {
  ACTIVATE = "ACTIVATE",
  UNACTIVATE = "UNACTIVATE",
}
enum ECouponType {
  PERCENT = "PERCENT",
  AMOUNT = "AMOUNT",
}
enum ERatingStatus {
  ACTIVE = "ACTIVE",
  UNACTIVE = "UNACTIVE",
}
enum ECommentStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}
export {
  ECommentStatus,
  ERatingStatus,
  ECouponStatus,
  ECourseLevel,
  ECourseStatus,
  ELessonType,
  EUserRole,
  EUserStatus,
  EOrderStatus,
  ECouponType,
};
