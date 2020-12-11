import React from "react";

export default function DebtData({ numberWithCommas, debtInfo }) {
  return (
    <>
      {debtInfo.data_date && (
        <div className="DebtData">
          <p>US Debt: {numberWithCommas(debtInfo[0].tot_pub_debt_out_amt)}</p>
          <p>
            Updated: {debtInfo[0].data_date}
            <a
              href="https://www.transparency.treasury.gov/article/api-debt-to-the-penny"
              target="_blank"
              rel="noreferrer"
            >
              Source
            </a>
          </p>
        </div>
      )}
    </>
  );
}
