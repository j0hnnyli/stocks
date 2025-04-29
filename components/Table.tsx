type TableProps = {
  currentPrice : number;
  symbol : string;
  high : number;
  low : number;
  open : number;
  prevClose : number;
}

const Table = ({currentPrice, symbol, high, low, open, prevClose} : TableProps) => {
  const changePercent = (((currentPrice - prevClose) / currentPrice) * 100).toFixed(2);

  return (
    <table className="text-white w-full md:w-[40%] border">
      <thead className="border-b border-white border">
        <tr className="text-xl text-left">
          <th className="p-2">Metrics</th>
          <th>Values</th>
        </tr>
      </thead>
      <tbody className="w-full">
        <tr className="py-2">
          <td className="border-b p-2">Symbol</td>
          <td className="border-b p-2">{symbol}</td>
        </tr>
        <tr>
          <td className="border-b p-2">Price</td>
          <td className="border-b p-2">${currentPrice}</td>
        </tr>
        <tr>
          <td className="border-b p-2">Change %</td>
          <td className="border-b p-2">
            {currentPrice !== 0 ? (
              <>
                <span className={`${currentPrice - prevClose >= 0 ? 'text-green-500' : 'text-red-500'} mr-1`}>
                  {currentPrice - prevClose >= 0 ? '+' : ''}
                </span>
                <span className={`${currentPrice - prevClose >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {changePercent}% 
                </span>
                (from ${prevClose})
              </>
            ) : (
              0
            )}
          </td>
        </tr>
        <tr>
          <td className="border-b p-2">Open</td>
          <td className="border-b p-2">${open}</td>
        </tr>
        <tr>
          <td className="border-b p-2">High</td>
          <td className="border-b p-2">${high}</td>
        </tr>
        <tr>
          <td className="border-b p-2">Low</td>
          <td className="border-b p-2">${low}</td>
        </tr>
        <tr>
          <td className="border-b p-2">Prev Close</td>
          <td className="border-b p-2">${prevClose}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Table