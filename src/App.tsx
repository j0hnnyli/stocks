import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../lib/baseurl';
import DisplayInfo from '../components/DisplayInfo'

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

type SearchResult = {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
};

function App() {
  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedStock, setSelectedStock] = useState<string>('AAPL');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const searchSymbol = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/search?q=${encodeURIComponent(query)}&exchange=US&token=${import.meta.env.VITE_FINNHUB_API_KEY}`
      );
      const data = await res.json();
      setSearchResults(data.result || []);
      setError('');
    } catch (err) {
      if(err instanceof Error){
        setError(err.message || 'Something went wrong');
      }
    } 

    setIsLoading(false);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchSymbol(input);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [input]);


  return (
    <div className="p-5 md:p-16 ">
      <div className="max-w-[1000px] mx-auto text-white">
        <h2 className="text-6xl tracking-widest">Stock Viewer</h2>

        <div className="my-5 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search Stocks..."
            className="border-b border-white w-full text-3xl py-2 bg-transparent outline-none text-white"
          />

          {input.length > 0 && (isLoading || searchResults.length > 0) && (
            <>
              {isLoading && (
                <div className="absolute z-10 w-full bg-white text-black p-2">
                  <div className='h-20 w-full bg-gray-500 animate-pulse rounded-lg mb-2'></div>
                  <div className='h-20 w-full bg-gray-500 animate-pulse rounded-lg mb-2'></div>
                  <div className='h-20 w-full bg-gray-500 animate-pulse rounded-lg mb-2'></div>
                </div> 
              )}

              {!isLoading && searchResults.length > 0 && (
                <div className="absolute z-10 w-full bg-white text-black shadow max-h-[300px] overflow-y-auto p-2">
                  {searchResults.map((stock) => (
                    <div
                      key={stock.symbol}
                      className="p-2 hover:bg-gray-200 cursor-pointer border-b rounded-lg mb-2"
                      onClick={() => {
                        setSelectedStock(stock.symbol);
                        setInput("");
                        setSearchResults([])
                      }}
                    >
                      <h3 className="font-bold">{stock.symbol}</h3>
                      <p className="text-sm text-gray-600">{stock.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <DisplayInfo symbol={selectedStock}/>
      </div>
    </div>
  );
}

export default App;
