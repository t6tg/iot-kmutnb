const App = () => {
  return (
    <div className="m-10">
      <div className="flex justify-center bg-pink-500 text-white rounded-md">
        <h1 className="text-lg font-bold m-8 text-center lg:text-4xl">
          ระบบรายงานอุณหภูมิภายในห้องและระบายความร้อน (Temperature Report)
        </h1>
      </div>
      <div className="lg:grid lg:gap-5 lg:grid-cols-2 mt-8">
        <div className="bg-indigo-500 rounded-md p-4 lg:p-10 text-white">
          <div className="flex text-center justify-center m-auto">
            <h2 className="font-bold text-2xl lg:text-4xl">สถานะพัดลม : </h2>
            <span className="my-auto ml-2 text-2xl  lg:text-4xl font-semibold text-green-400">
              เปิดใช้งาน
            </span>
          </div>
        </div>
        <div className="bg-yellow-500 rounded-md p-4 lg:p-10 mt-5 lg:mt-0">
          <h2 className="font-bold text-2xl lg:text-4xl text-white">
            อัพเดตล่าสุด :{" "}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default App;
