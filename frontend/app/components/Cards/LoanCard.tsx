const field_to_dict = {
  "Loan A": "loanA",
  "Loan B": "loanB",
  "Loan C": "loanC",
}

const LoanCard = ({ title, type, amount, balance, appliedFor }: { title: string; type: string; amount: number; balance: number; appliedFor: number }) => {
  return (
  
  <div className="flex w-full justify-around gap-4">
      <div className="border border-gray-150 rounded-lg my-2 flex-grow">
        <div className="px-6 py-2">
          <h1 className="py-2 font-semibold text-base">{title}</h1>
        </div>
        <div className="px-6 pb-4 divide-y divide-gray-200">
          <div className="flex justify-between py-2">
            <p>Type: </p>
            <p>{type}</p>
          </div>
          <div className="flex justify-between py-2">
            <p>Original: </p>
            <p>{amount}</p>
          </div>
          <div className="flex justify-between py-2">
            <p>Balance Left: </p>
            <p>{balance}</p>
          </div>
          <div className="flex justify-between py-2">
            <p>Applied For: </p>
            <p>{appliedFor}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCard;
