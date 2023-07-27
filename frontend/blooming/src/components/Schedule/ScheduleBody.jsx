function ScheduleBody({ onCreatePost }) {
  return (
    <header>
      <p>
        <button onClick={onCreatePost}>
          +
        </button>
      </p>
    </header>
  );
}

export default ScheduleBody;