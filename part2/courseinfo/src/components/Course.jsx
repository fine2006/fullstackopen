const Course = ({ course }) => {
  const sumArr = (total, part) => {
    return total + part.exercises;
  };
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map((part) => (
        <div key={part.id}>
          {part.name} {part.exercises}
        </div>
      ))}
      <h4>total of {course.parts.reduce(sumArr, 0)} exercises</h4>
    </div>
  );
};

export default Course;
