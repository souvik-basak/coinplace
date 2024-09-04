import { useState, useEffect, useContext } from "react";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") setDisplayCoin(allCoin);
  };
  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);
  return (
    <div className="py-12 pb-24 ">
      <div className="w-2xl mx-20 my-auto flex flex-col items-center text-center gap-8 ">
        <h1 className="font-bold text-6xl">
          Largest <br /> Crypto Marketplace
        </h1>
        <p className="w-3/4 text-[#e3e3e3] leading-8 text-xl">
          Welcome to the world&apos;s Largest cryptocurrency marketplace.
          <br /> Sign up to explore more about cryptos.
        </p>
        <form
          className="p-2 w-3/4 bg-white rounded-md text-xl flex justify-between items-center gap-3"
          onSubmit={searchHandler}
        >
          <input
            type="text"
            required
            placeholder="Search crypto..."
            className="flex-1 text-base outline-none border-none pl-3 text-black"
            onChange={inputHandler}
            value={input}
            list="coinList"
          />
          <datalist id="coinList">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button className="text-white border-none bg-[#7927ff] px-5 py-2 rounded cursor-pointer">
            Search
          </button>
        </form>
      </div>
      <br />
      <div className="max-w-4xl m-auto rounded-2xl bg-gradient-to-b from-purple-900 to-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-5 px-4 py-5 items-center border-[#ffffff] last:bottom-0">
          <p className="text-2xl font-bold">#</p>
          <p className="text-center text-2xl font-bold">Coin Names</p>
          <p className="text-center text-2xl font-bold">Price</p>
          <p className="text-center text-2xl font-bold">24H Change</p>
          <p className="text-right text-2xl font-bold">Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`}
            className="grid grid-cols-1 md:grid-cols-5 px-4 py-5 items-center border-[#ffffff]"
            key={index}
          >
            <p className="text-left">{item.market_cap_rank}</p>
            <div className="flex flex-row gap-4 items-center">
              <img src={item.image} alt="" className="w-6 h-6" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p className="text-center">
              {currency.symbol}
              {item.current_price.toLocaleString()}
            </p>
            <p
              className={
                item.price_change_24h > 0
                  ? "text-green-600 text-center"
                  : "text-red-600 text-center"
              }
            >
              {Math.floor(item.price_change_24h * 100) / 100}
            </p>
            <p className="text-right">
              {currency.symbol}
              {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
