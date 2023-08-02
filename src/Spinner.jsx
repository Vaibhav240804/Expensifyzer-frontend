
function Spinner() {
  return (<>
  <div className="w-screen h-screen p-4 flex ">
    <div className="border border-2 border-slate-900 shadow rounded-2xl p-0 w-full mx-auto animate-pulse h-full flex flex-col justify-center items-center">
      <div className="w-full h-5/6 flex flex-col justify-center items-center">
        <div className="w-4/5 h-1/6 absolute top-0 left-0 right-0 m-auto">
          <div className="rounded-2xl h-full w-full grid md:grid-cols-4 grid-cols-2 gap-2 content-evenly ">
          <li className="rounded-full bg-slate-700"></li>
          <li className="rounded-full bg-slate-600"></li>
          <li className="rounded-full bg-slate-700"></li>
          <li className="rounded-full bg-slate-600"></li>
          </div>
        </div>
        <div className="py-1 w-full h-5/6 flex flex-col justify-around items-center">
          <div className="h-1/6 w-3/5 rounded flex flex-col justify-around items-center">
            <div className="w-3/5 h-1/6 bg-slate-700"> </div>
            <div className="w-2/5 h-1/6 bg-slate-600"> </div>
          </div>
          <div className="border border-slate-800 w-4/5 h-3/5 rounded-2xl flex flex-col justify-evenly items-center">
            <div className=" h-full w-full flex flex-col justify-evenly items-center">
              <div className="h-5 w-4/5 bg-slate-700 rounded"></div>
              <div className="h-5 w-4/5 bg-slate-600 rounded"></div>
              <div className="h-5 w-4/5 bg-slate-700 rounded"></div>
              <button className="h-3 w-3/5 bg-slate-800 rounded shadow-2xl"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}

export default Spinner;
