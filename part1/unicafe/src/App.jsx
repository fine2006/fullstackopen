import { useState } from "react";

const CounterButton = ({ name, onClick }) => {
  return <button onClick={onClick}>{name}</button>;
};

const StatisticLine = ({ name, data }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{data}</td>
    </tr>
  );
};
const Statistics = ({ feedback }) => {
  if (feedback.total == 0) {
    return <div> No feedback given </div>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine name="good" data={feedback.good} />
        <StatisticLine name="neutral" data={feedback.neutral} />
        <StatisticLine name="bad" data={feedback.bad} />
        <StatisticLine name="total" data={feedback.total} />
        <StatisticLine
          name="average"
          data={(feedback.good - feedback.bad) / feedback.total}
        />
        <StatisticLine
          name="positive"
          data={(feedback.good * 100) / feedback.total + "%"}
        />
      </tbody>
    </table>
  );
};

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
  });
  const handleGood = () => {
    setFeedback({
      ...feedback,
      good: feedback.good + 1,
      total: feedback.total + 1,
    });
  };
  const handleNeutral = () => {
    setFeedback({
      ...feedback,
      neutral: feedback.neutral + 1,
      total: feedback.total + 1,
    });
  };
  const handleBad = () => {
    setFeedback({
      ...feedback,
      bad: feedback.bad + 1,
      total: feedback.total + 1,
    });
  };
  return (
    <div>
      <h1>give feedback</h1>
      <CounterButton onClick={handleGood} name="good" />
      <CounterButton onClick={handleNeutral} name="neutral" />
      <CounterButton onClick={handleBad} name="bad" />
      <h1>statistics</h1>
      <Statistics feedback={feedback} />
    </div>
  );
};

export default App;
