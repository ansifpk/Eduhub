
const BrickLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 bg-black rounded-sm animate-brick-wave delay-${i * 100}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BrickLoader;