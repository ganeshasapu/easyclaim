import { highlightContext } from "@/app/compare_claims/[claim_ids]/page";
import { useContext } from "react";

const field_to_dict = {
  "Loan A": "loanA",
  "Loan B": "loanB",
  "Loan C": "loanC",
}

const LoanCardHighlighted = ({ title, type, amount, balance, appliedFor }: { title: string; type: string; amount: number; balance: number; appliedFor: number }) => {
  const hightlightDict = useContext(highlightContext);
  if (Object.keys(hightlightDict).length == 0) {
    return null
  }
  const titleHighlight = hightlightDict.generalLoanInformation[field_to_dict[title]]
  return (
  
  <div className="flex w-full justify-around gap-4">
      <div className="border border-gray-150 rounded-lg my-2 flex-grow">
        <div className="px-6 py-2">
          <h1 className="py-2 font-semibold text-base">{title}</h1>
        </div>
        <div className="px-6 pb-4 divide-y divide-gray-200">
          <div className="flex justify-between py-2">
            <p>Type: </p>
            <p style={{backgroundColor : titleHighlight.typeOrPurposeOfLoan ? "#dcfce7" : "transparent"}}>{type}</p>
          </div>
          <div className="flex justify-between py-2">
            <p>Original: </p>
            <p style={{backgroundColor : titleHighlight.originalAmountOfLoan}}>{amount}</p>
          </div>
          <div className="flex justify-between py-2">
            <p>Balance Left: </p>
            <p style={{backgroundColor : titleHighlight.balanceOnDateOfDeath}}>{balance}</p>
          </div>
          <div className="flex justify-between py-2">
            <p>Applied For: </p>
            <p style={{backgroundColor : titleHighlight.amountOfInsuranceAppliedFor}}>{appliedFor}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCardHighlighted;
