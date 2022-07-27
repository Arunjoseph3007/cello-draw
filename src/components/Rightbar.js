const Rightbar = ({ selectedShape }) => {
  
  if (!selectedShape)
    return (
      <div className="h-full w-1/5 dead-center">
        <h1 className="text-xl text-slate-400 ">No Shape selected</h1>
      </div>
    );

  return (
    <div className="h-full w-1/5">
      <h1>{selectedShape?.type}</h1>
    </div>
  );
};

export default Rightbar;
