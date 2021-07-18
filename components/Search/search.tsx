import React, { useState } from 'react';
// @ts-ignore
export default function Search({stateChanger}){

    const [state, setState] = useState<any>("");
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    	setState(e.target.value);
  	}

	return (
	<div>
	  <div className="mt-1 relative flex items-center w-1/2 mx-auto mb-12">
	    <input
	      type="text"
	      name="search"
	      placeholder="search"
	      id="search"
	      value={state} onChange={e => handleChange(e)}
	      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
	    />
	     <button type="submit" onClick={() => {stateChanger(state);}}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
            Search
          </button>
	  </div>
	</div>
	)
}
