import {useState, useEffect} from 'react'
import { BASE_URL } from '../lib/baseurl';
import Table from './Table'
import Chart from './Chart'

type Props = {
  symbol : string | undefined;
}

type StockInfo = {
  c : number
  h : number;
  l : number;
  o : number;
  pc : number;
  t : number;
}

const key = import.meta.env.VITE_FINNHUB_API_KEY

const DisplayInfo = ({ symbol } : Props ) => {
  const [stockInfo, setStockInfo] = useState<StockInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getInfo(){
      setIsLoading(true)
      try{
        const res = await fetch(`${BASE_URL}quote?symbol=${symbol}&token=${key}`);
        const data = await res.json();
        setStockInfo(data)
      }catch(err){
        if(err instanceof Error){
          console.log(err.message)
        }
      }
      setIsLoading(false)
    }

    getInfo();
  }, [symbol])

  return (
    <>
      {isLoading ? (<div className='h-[350px] bg-gray-500 animate-pulse rounded-lg'/>) : (
          <>
            {stockInfo && (
              <div className="fflex flex-col-reverse md:flex-row gap-5 w-full">
                  <div className="flex flex-col-reverse md:flex-row gap-5 w-full">
                    <Table
                      currentPrice={stockInfo.c}
                      symbol={symbol!}
                      high={stockInfo.h}
                      low={stockInfo.l}
                      open={stockInfo.o}
                      prevClose={stockInfo.pc}
                    />
              
                    <Chart
                      currentPrice={stockInfo.c}
                      prevClose={stockInfo.pc}
                      label={symbol!}
                    />
                </div>
              </div>
              ) 
            }   
          </>
      )}
    </>
  )
}

export default DisplayInfo;