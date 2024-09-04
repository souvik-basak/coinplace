import { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/CoinContext";
import { MdArrowUpward } from "react-icons/md";

function CryptoTable() {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input,setInput] = useState('')
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);
  const searchHandler = async (e)=>{
    e.preventDefault()
    const coins = await allCoin.filter((item)=>{
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins)
  }
  return (
    
  );
}

export default CryptoTable;
