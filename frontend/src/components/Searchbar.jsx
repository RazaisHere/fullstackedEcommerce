import { assets } from '../assets/frontend_assets/assets';
import { useShop } from '../context/ShopContext';


function Searchbar() {
    const { setSearch, showSearch, setShowSearch } = useShop();
    

    return showSearch ? (
        <div className='border-t border-b bg-gray-50 text-center py-3'>
            <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 mx-3 rounded-full w-3/4 sm:w-1/2'>
                <input 
                    type="text" 
                    placeholder='Search' 
                    onChange={(e) => setSearch(e.target.value)} 
                    className='flex-1 outline-none bg-inherit text-sm pl-9 sm:pl-1 relative' 
                />
                <img src={assets.search_icon} className='w-4 absolute right-[5rem] sm:right-[31%]' alt="Search Icon" />
            </div>
            <img src={assets.cross_icon} onClick={() => setShowSearch(false)} className='inline cursor-pointer w-3' alt="Close Icon" />
        </div>
    ) : null;
}

export default Searchbar;
