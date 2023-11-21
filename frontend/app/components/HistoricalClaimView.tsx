const HistoricalClaimView = ({lifeclaim}: {lifeclaim: LifeClaim}) => {
  return (
    <div>
      <h2>{"This is a historical claim"}</h2>
      <h2>{lifeclaim.autopsyPerformed}</h2>
    </div>
  );
};

export default HistoricalClaimView;
