import { highlightContext } from "@/utils";

import { useContext } from "react";

const field_to_dict: any = {
  "Inquest Held": "inquestHeld",
  "Place of Death": "placeOfDeath",
  "Autopsy Performed": "autopsyPerformed",
  "Cause of Death": "causeOfDeath",
  Hospitalized: "hospitalized",
  "Type of Death": "typeOfDeath",
  "Date Last Worked": "dateLastWorked",
  Occupation: "occupation",
  "Reason Stopped Working": "reasonInsuredStoppedWorking",
  "Lending Institute Name": "nameOfLendingInstitution",
  "Lending Institute Province": "lendingInstitutionProvince",
};

const InfoCardHighlighted = ({
  title,
  fields,
  values,
}: {
  title: string;
  fields: string[];
  values: string[];
}) => {
  const hightlightDict: any = useContext(highlightContext);
  if (Object.keys(hightlightDict).length == 0) {
    return null;
  }

  const inner_dict = title == "General Information" ? hightlightDict : title == "Medical Information" ? hightlightDict.medicalInformation : title == "Employment Information" ? hightlightDict.employmentInformation : hightlightDict.generalLoanInformation
  
  return (
    <div className="border border-gray-150 rounded-lg my-4">
      <div className="px-6 py-2">
        <h1 className="py-2 font-semibold text-base">{title}</h1>
      </div>
      <div className="px-6 pb-4 divide-y divide-gray-200">
        {fields.map((field, index) => (
          <div key={index} className="flex justify-between py-2">
            <p>{field}:</p>
            <p
              style={{
                backgroundColor: inner_dict[field_to_dict[field]] ? "#dcfce7" : "transparent",
              }}
            >
              {values[index]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCardHighlighted;
