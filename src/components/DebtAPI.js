import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DebtAPI({ numberWithCommas, setUsDebt, infoIsActive }) {
  const [info, setInfo] = useState([]);
  const [infoIsReady, setInfoIsReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          "https://www.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/debt_to_penny?sort=-data_date"
        );
        setInfo(response.data.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (info.tot_pub_debt_out_amt) {
      setInfoIsReady(true);
      setUsDebt(Number(info.tot_pub_debt_out_amt));
    }
  }, [info, setUsDebt]);

  return (
    <div className={infoIsActive ? "DebtAPI" : "display-none"}>
      {infoIsReady ? (
        <div>
          <p>US Debt: ${numberWithCommas(info.tot_pub_debt_out_amt)}</p>
          <p>
            As of: {info.data_date}
            <a
              href="https://www.transparency.treasury.gov/article/api-debt-to-the-penny"
              target="_blank"
              rel="noreferrer"
            >
              Source
            </a>
          </p>
        </div>
      ) : (
        <div className="none"></div>
      )}
    </div>
  );
}
