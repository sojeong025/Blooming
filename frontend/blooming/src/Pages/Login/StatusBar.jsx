const StatusBar = ({
  currentStep,
  totalSteps,
  backgroundColor,
  progressColor,
  height = 10,
}) => {
  return (
    <div className='status-bar' style={{ backgroundColor, height }}>
      <div
        className='progress'
        style={{
          width: `${(currentStep / totalSteps) * 100}%`,
          backgroundColor: progressColor,
          height,
        }}
      />
    </div>
  );
};

export default StatusBar;
