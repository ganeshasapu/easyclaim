
const InfoCard = ({
  title,
  fields,
  values
}: {
  title: string;
  fields: string[];
  values: string[];
}) => {
  return (
    <div className="border border-gray-150 rounded-lg my-4">
      <div className="px-6 py-2">
        <h1 className="py-2 font-semibold text-base">{title}</h1>
      </div>
      <div className="px-6 pb-4 divide-y divide-gray-200">
        {fields.map((field, index) => (
          <div key={index} className="flex justify-between py-2">
            <p>{field}:</p>
            <p>{values[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCard;
