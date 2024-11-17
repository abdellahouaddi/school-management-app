import React, { useEffect, useState } from "react";
import { Youtube, BookOpen, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../features/courses/coursesSlice";
import { fetchQuizzes } from "../../features/quizzes/quizzesSlice";

const Courses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, status, error } = useSelector((state) => state.courses);
  const { quizzes } = useSelector((state) => state.quizzes);

  const [teacherFilter, setTeacherFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCourses());
      dispatch(fetchQuizzes());
    }
  }, [status, dispatch]);

  const handleAction = (course) => {
    if (course.status === "completed") {
      const quiz = quizzes.find((q) => q.courseId === course.coursequizID);
      if (quiz) {
        navigate(`/quizzes/${quiz.quizID}`);
      } else {
        console.error(`Quiz not found for course ID: ${course.coursequizID}`);
      }
    } else {
      navigate(`/courses/${course.id}`);
    }
  };

  // Generate unique values for dropdowns
  const teacherNames = ["all", ...new Set(courses.map((course) => course.teacherName))];
  const courseNames = ["all", ...new Set(courses.map((course) => course.courseName))];

  // Filtered course list
  const filteredCourses = courses.filter((course) => {
    const matchesTeacher =
      teacherFilter === "all" || course.teacherName === teacherFilter;
    const matchesCourse =
      courseFilter === "all" || course.courseName === courseFilter;
    return matchesTeacher && matchesCourse;
  });

  if (status === "loading")
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (status === "failed")
    return <div className="p-8 text-red-600 text-center">Error: {error}</div>;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Your Courses</h2>

        {/* Filters */}
        <div className="mb-8 flex space-x-4 md:space-x-8 justify-end items-end">
          {/* Teacher Filter */}
          <select
            className="select select-bordered w-full md:w-[200px]"
            aria-label="Filter courses by teacher"
            value={teacherFilter}
            onChange={(e) => setTeacherFilter(e.target.value)}
          >
            {teacherNames.map((teacher) => (
              <option key={teacher} value={teacher}>
                {teacher === "all" ? "All Teachers" : teacher}
              </option>
            ))}
          </select>

          {/* Course Filter */}
          <select
            className="select select-bordered w-full md:w-[200px]"
            aria-label="Filter courses by course name"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            {courseNames.map((course) => (
              <option key={course} value={course}>
                {course === "all" ? "All Courses" : course}
              </option>
            ))}
          </select>
        </div>

        {/* Courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.length ? (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105"
              >
                <div className="relative group">
                  <img
                    src={course.imageUrl}
                    alt={course.courseName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {course.courseName}
                  </h3>

                  <div className="flex items-center space-x-2 text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.teacherName}</span>
                  </div>

                  <p className="text-gray-600">{course.courseDescription}</p>

                  <button
                    onClick={() => handleAction(course)}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-colors duration-200 ${
                      course.status === "completed"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {course.status === "completed" ? "Start Quiz" : "Complete Course"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-12">
              No courses match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;