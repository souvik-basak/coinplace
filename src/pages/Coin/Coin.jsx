import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import ClockLoader from "react-spinners/ClockLoader";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [data, setData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-GQ7jAH5bAYcBabB3AkL3uuXS",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-GQ7jAH5bAYcBabB3AkL3uuXS",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHistoricalData(response))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchCoinData();
    fetchHistoricalCoinData();
  }, [currency]);

  if (data && historicalData) {
    return (
      <div className="px-0 pt-5 items-center justify-center">
        <div className="flex flex-col items-center gap-5 mx-24 my-auto mb-12">
          <img src={data.image.large} alt="" className="max-w-24"/>
          <p>
            <b className="text-4xl font-medium">
              {data.name} ({data.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="max-w-3xl h-64 mx-auto">
          <LineChart historicalData={historicalData} />
        </div>
        <div className="max-w-2xl mx-auto flex flex-col text-lg font-semibold">
          <ul className="flex justify-between px-3 py-0 border-b-2 border-[#5f5d5f] list-none">
            <li>Crypto Market Rank</li>
            <li>{data.market_cap_rank}</li>
          </ul>
          <ul className="flex justify-between px-3 py-0 border-b-2 border-[#5f5d5f] list-none">
            <li>Current Price</li>
            <li>
              {currency.symbol}{" "}
              {data.market_data.current_price[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul className="flex justify-between px-3 py-0 border-b-2 border-[#5f5d5f] list-none">
            <li>Market Cap</li>
            <li>
              {currency.symbol}{" "}
              {data.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul className="flex justify-between px-3 py-0 border-b-2 border-[#5f5d5f] list-none">
            <li>Low 24H</li>
            <li>
              {currency.symbol}{" "}
              {data.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul className="flex justify-between px-3 py-0 border-b-2 border-[#5f5d5f] list-none">
            <li>High 24H</li>
            <li>
              {currency.symbol}{" "}
              {data.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid place-self-center min-h-[80vh]">
        <div className="w-auto h-auto place-self-center border-8 rounded-full">
          <ClockLoader color={"#000"} loading={true} size={150} />
        </div>
      </div>
    );
  }
};

export default Coin;
