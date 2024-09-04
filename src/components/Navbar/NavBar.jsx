import { useContext } from "react";
import logo from "../../assets/logo.png";
import { MdArrowOutward } from "react-icons/md";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";
const NavBar = () => {
  const { setCurrency } = useContext(CoinContext);
  const currencyHandler = (e) => {
    switch (e.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };
  return (
    <div className="flex items-center justify-between px-5 py-2 text-[#ddd] border-b-2 min-md:px-5 min-md:py-2 max-sm:px-5 max-sm:py-2">
      <Link to={"/"}>
        <img src={logo} className="w-32" />
      </Link>
      <ul className="flex flex-row gap-10 list-none h-5">
        <Link to={"/"}>
          <li className="cursor-pointer">Home</li>
        </Link>
        <li className="cursor-pointer">Features</li>
        <li className="cursor-pointer">Pricing</li>
        <Link to={"/news"}>
        <li className="cursor-pointer">News</li>
        </Link>
      </ul>
      <div className="text-black flex items-center gap-3">
        <select
          name=""
          id=""
          className="px-2 py-2 border-2 bg-transparent rounded-lg text-white"
          onChange={currencyHandler}
        >
          <option className="bg-[#09005c] text-white" value="usd">
            USD
          </option>
          <option className="bg-[#09005c] text-white" value="eur">
            EUR
          </option>
          <option className="bg-[#09005c] text-white" value="inr">
            INR
          </option>
        </select>
        <button className="flex items-center gap-1 px-3 py-3 font-bold text-base bg-white border-none cursor-pointer rounded-2xl max-md:gap-2 max-md:px-3 max-md:py-3 max-md:text-sm ">
          Sign Up
          <MdArrowOutward />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
