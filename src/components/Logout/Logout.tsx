function Logout() {
    const handlelogout = ()=>{
        
    }
  return (
    <>
      <button className="bg-red-500 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-red-600 hover:scale-105 transition-all duration-200" onClick={handlelogout}>
        Logout
      </button>
    </>
  );
}

export default Logout;
